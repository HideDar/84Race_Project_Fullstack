const Club = require('../models/index').Club;
const UserClub = require('../models/index').UserClub;
const User = require('../models/index').User;
const Challenge = require('../models/index').Challenge;
const sequelize = require('sequelize');

const getClubAttributes = () => {
  return [
    'club_id', 
    'name', 
    'description', 
    'logo',
    'active',
    [sequelize.literal(`(
      SELECT COUNT(*)
      FROM user_club AS uc
      WHERE uc.club_id = Club.club_id AND uc.status = 'approved'
    )`), 'memberCount']
  ];
};

const getClubInclude = () => {
  return [{
    model: UserClub,
    as: 'UserClubs',
    required: false
  }];
};
const getUserInclude = () => {
  return [{
    model: User,
    as: 'users',
    required: false,
    attributes: ['username', 'full_name', 'profile_image'],
  }
];
}





exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll({
      attributes: getClubAttributes(),
      include: getClubInclude()
    });
    res.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.getClubById = async (req, res) => {
  try {
    
    const clubId = req.params.id;
    const club = await Club.findByPk(clubId, {
      attributes: getClubAttributes(),
      include: getUserInclude(),
    });
    res.json(club);
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.getClubJoin = async (req, res) => {
    try {
        const userId = req.params.id;
        const club = await UserClub.findAll({ where: { user_id: userId } });
        res.json(club);
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

exports.joinClub = async (req, res) => {
    const userId = req.params.id;
    const clubId = req.params.clubId;

    if (!userId || !clubId) {
        return res.status(400).json({ success: false, message: 'User ID and Club ID are required.' });
    }

    const clubExists = await Club.findByPk(clubId);
    if (!clubExists) {
        return res.status(404).json({ success: false, message: 'Club not found.' });
    }

    const isActive = clubExists.active;
    if (isActive) {
        try {
            const userClub = await UserClub.create({
                user_id: userId,
                club_id: clubId,
                role: 'member',
                status: 'approved', 
                joined_at: new Date(),
            });
            return res.json({ success: true, message: 'Successfully joined the club!', data: userClub });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error while joining the club.', error: error.message });
        }
    } else {

        try {
            const userClub = await UserClub.create({
                user_id: userId,
                club_id: clubId,
                role: 'member',
                status: 'pending', 
                joined_at: null, 
            });
            return res.json({ success: true, message: 'Your request to join the club is pending approval.', data: userClub });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error while requesting to join the club.', error: error.message });
        }
    }
};


exports.leaveClub = async (req, res) => {
    const userId = req.params.userId;
    const clubId = req.params.clubId;

    const userClub = await UserClub.findOne({ where: { user_id: userId, club_id: clubId, status: 'approved' } });
    if (!userClub) {
        return res.status(404).json({ success: false, message: 'User is not a member of this club.' });
    }

    await UserClub.destroy({ where: { user_id: userId, club_id: clubId, status: 'approved' } });
    res.json({ message: 'User left the club' });
}

// exports.deleteClub = async (req, res) => {
//     const clubId = req.params.id;
//     await Club.destroy({where: {club_id: clubId}});
//     res.json({message: 'Club deleted'});
// }

exports.deleteUserClub = async (req, res) => {
  const id = req.params.id;
  await UserClub.destroy({where: {id: id}});
  res.json({message: 'UserClub deleted'});
};


exports.getRoleById = async (req, res) => {
  const userId = req.params.userId;
  const clubId = req.params.clubId;
  const userClub = await UserClub.findOne({where: {user_id: userId, club_id: clubId}});
  res.json(userClub);
}
exports.getMemberPending = async (req, res) => {
  const clubId = req.params.clubId;
  const userClub = await UserClub.findAll({
    where: { club_id: clubId, status: 'pending' },
    include: [{
      model: User,
      as: 'members',
      attributes: ['username', 'full_name', 'profile_image'],
    }]
  });
  res.json(userClub);
}

exports.approveMember = async (req, res) => {
  const id = req.params.id;
  try {
    await UserClub.update({status: 'approved'}, {where: {id: id}});
    res.json({message: 'UserClub approved'});
  } catch (error) {
    res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
  }
}

exports.rejectMember = async (req, res) => {
  const id = req.params.id;
  try {
    await UserClub.destroy({where: {id: id}});
    res.json({message: 'UserClub rejected'});
  } catch (error) {
    res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
  }
}
