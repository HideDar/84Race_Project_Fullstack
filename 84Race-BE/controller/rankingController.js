const Ranking = require('../models/index').Ranking;
const User = require('../models/index').User;

// Ensure the association is defined in your models
Ranking.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

exports.getPersonalRanking = async (req, res) => {
    try{
        const ranking = await Ranking.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'full_name', 'profile_image'],
                    as: 'User'
                }
            ],
            order: [['score', 'DESC']]
        });
    
        const rankingWithScore = ranking.map((ranking, index) => {
            let level;
            if(ranking.score >= 500){
                level = 'Ultra Trail';
            }else if(ranking.score >= 300 && ranking.score < 500){
                level = 'Ironman 140.6';
            }else if(ranking.score >= 100 && ranking.score < 300){
                level = 'Ultra Marathon';
            }else if(ranking.score >= 70 && ranking.score < 100){
                level = 'Ironman 70.3';
            }else if(ranking.score >= 42 && ranking.score < 70){
                level = 'FullMarathon';
            }else if(ranking.score >= 21 && ranking.score < 42){
                level = 'Half Marathon';
            }else if(ranking.score >= 9 && ranking.score < 21){
                level = 'Breaking 21';
            }else{
                level = 'Milestone';
            }
            return {
                rank: index + 1,
                ...ranking.toJSON(),
                level: level,
                name: ranking.User.full_name,
                image: ranking.User.profile_image,
            }
        });
    
        res.status(200).json(rankingWithScore);

    }catch(error){
        res.status(500).json({message: error.message});
    }

}

exports.getAllInforUserRanking = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Ranking,
                    as: 'rankings',
                }
            ]
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
