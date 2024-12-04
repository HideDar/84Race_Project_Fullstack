const Challenge = require('../models/index').Challenge;
const ChallengeParticipant = require('../models/index').ChallengeParticipant;
const sequelize = require('sequelize');
const Ranking = require('../models/index').Ranking;
const User = require('../models/index').User;
exports.createChallenge = async (req, res) => {
    const { name, description, category, start_date, end_date, img, challenge_type, rules, goal_distance, goal_time } = req.body;
    try {
        const challenge = await Challenge.create({ name, description, category, start_date, end_date, img, challenge_type, rules, goal_distance, goal_time });
        res.status(201).json(challenge);
    } catch (error) {
        console.error("Error creating challenge:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllChallenges = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const challenges = await Challenge.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        const totalItems = await Challenge.count();
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            data: challenges,
            pagination: { totalItems, totalPages, currentPage: parseInt(page) }
        });
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getChallengeByClubId = async (req, res) => {
    const clubId = req.params.id;
    const challenges = await Challenge.findAll({ where: { club_id: clubId } });
    res.status(200).json(challenges);
};



exports.getChallengeById = async (req, res) => {
    const challengeId = req.params.id;

    try {
        const challenge = await Challenge.findOne({
            where: { challenge_id: challengeId },
            include: [
                {
                    model: ChallengeParticipant,
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [
                        sequelize.fn('COUNT', sequelize.col('challengeParticipants.user_id')),
                        'totalParticipants'
                    ]
                ]
            },
            group: ['challenge.challenge_id']
        });

        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        res.status(200).json(challenge);
    } catch (error) {
        console.error("Error fetching challenge details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateChallenge = async (req, res) => {
    const challengeId = req.params.id;
    const { name, description, category, start_date, end_date, img, challenge_type, rules, goal_distance, goal_time } = req.body;
    if (!name || !description || !category || !start_date || !end_date || !challenge_type) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const challenge = await Challenge.findOne({ where: { challenge_id: challengeId } });

        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        await Challenge.update(
            { name, description, category, start_date, end_date, img, challenge_type, rules, goal_distance, goal_time },
            { where: { challenge_id: challengeId } }
        );

        const updatedChallenge = await Challenge.findOne({ where: { challenge_id: challengeId } });

        res.status(200).json({
            message: 'Challenge updated successfully',
            data: updatedChallenge
        });

    } catch (error) {
        console.error("Error updating challenge:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
 
exports.deleteChallenge = async(req, res) => {
    const challengeId = req.params.id;

    try{
        await Ranking.destroy({where:{challenge_id: challengeId}});
        await ChallengeParticipant.destroy({where:{challenge_id: challengeId}});

        await Challenge.destroy({where:{challenge_id: challengeId}});
        res.status(200).json({message: 'Challenge deleted successfully'});  
    }catch(error){
        console.error("Error deleting challenge:", error);
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }

};
exports.joinChallenge = async (req, res) => {
    const challengeId = req.params.id;
    const userId = req.params.user_id;
    console.log(challengeId, userId);   
    try{
        await ChallengeParticipant.create({ challenge_id: challengeId, user_id: userId });
        res.status(200).json({message: 'User joined challenge successfully'});
    }catch(error){
        console.error("Error joining challenge:", error);
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}
exports.getChallengeParticipant = async (req, res) => {
    const challengeId = req.params.id;
    const participants = await ChallengeParticipant.findAll({
        where: {challenge_id: challengeId},
        include: [{
            model: User,
            attributes: ['username', 'full_name', 'profile_image'], 
            as: 'user'
        }]
    });
    res.status(200).json(participants);
}
exports.SaveDataUserRunning = async (req, res) => {
    const challengeId = req.params.id;
    const { distance, time, userId } = req.body;

    try {
        const participant = await ChallengeParticipant.findOne({ where: { challenge_id: challengeId, user_id: userId } });

        if (!participant) {
            return res.status(404).json({ message: 'Participant not found' });
        }

        const participantTotalTimeParts = participant.total_time.split(':');
        const participantTotalTimeInSeconds = (parseInt(participantTotalTimeParts[0]) * 3600) + 
                                              (parseInt(participantTotalTimeParts[1]) * 60) + 
                                              parseInt(participantTotalTimeParts[2]);

        const timeParts = time.split(':');
        if (timeParts.length !== 3 || timeParts.some(part => isNaN(part))) {
            return res.status(400).json({ message: 'Invalid time format. Use HH:MM:SS' });
        }

        const total_time = (parseInt(timeParts[0]) * 3600) + (parseInt(timeParts[1]) * 60) + parseInt(timeParts[2]);

        const total_distance = parseFloat(participant.total_distance) + parseFloat(distance);   

        const updated_total_time = participantTotalTimeInSeconds + total_time;
        
        if (isNaN(updated_total_time)) {
            return res.status(400).json({ message: 'Calculated time is invalid.' });
        }

        const speed = updated_total_time > 0 ? (total_distance * 1000) / updated_total_time : 0;

        const formattedTime = formatTime(updated_total_time);
        
        await ChallengeParticipant.update({ 
            total_distance: total_distance, 
            total_time: formattedTime, 
            average_speed: speed, 
        }, { where: { challenge_id: challengeId, user_id: userId } });

        res.status(200).json({ message: 'User data updated successfully' });
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const formatTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return '00:00:00'; 
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
