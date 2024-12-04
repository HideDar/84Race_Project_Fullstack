const express = require('express');
const { getAllClubs, getClubById, getClubJoin, getRoleById, joinClub, leaveClub, deleteUserClub, getMemberPending, approveMember, rejectMember } = require('../controller/clubController');
const router = express.Router();

router.get('/', getAllClubs);
router.get('/:id', getClubById);
router.get('/:id/join', getClubJoin);
router.get('/:clubId/user-role/:userId', getRoleById);
router.post('/:clubId/join/:id', joinClub);
router.delete('/:clubId/leave/:userId', leaveClub);
router.delete('/:id', deleteUserClub);
router.get('/:clubId/pending-members', getMemberPending);
router.put('/:id/approve-member', approveMember);
router.put('/:id/reject-member', rejectMember);
module.exports = router;    