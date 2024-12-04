const express = require('express');
const { createChallenge, getAllChallenges, getChallengeById, updateChallenge,deleteChallenge, getChallengeByClubId, joinChallenge, getChallengeParticipant, SaveDataUserRunning } = require('../controller/challengeController');
const router = express.Router();
// const authorize = require('../middleware/authorize');

router.post('/', createChallenge);
router.get('/', getAllChallenges);
router.get('/user-challenges', getAllChallenges);
router.get('/:id', getChallengeById);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);
router.get('/club/:id', getChallengeByClubId);  
router.post('/:id/join/:user_id', joinChallenge);
router.get('/:id/participants', getChallengeParticipant);
router.post('/:id/form', SaveDataUserRunning);
module.exports = router;    