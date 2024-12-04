import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '../views/AppHome.vue';
import LogIn from '../pages/LogIn.vue';
import PageRegister from '../pages/PageRegister.vue';
import PageIntroduce from '../pages/PageIntroduce.vue';
import ChallengeC from '../components/ChallengeC.vue';
import RanKing from '../components/RanKing.vue';
import NewS from '../components/NewS.vue';
import PageProfile from '../pages/PageProfile.vue';
import ChallengeDetail from '../components/ChallengeDetail.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import ChallengeManagement from '../views/Admin/ChallengeManagement.vue';
import UserManagement from '../views/Admin/UserMangement.vue';
import ClubManagement from '../views/Admin/ClubManagement.vue';
import Statistical from '../views/Admin/Statistical.vue';
import Setting from '../views/Admin/Setting.vue';
import EditChallenge from '../views/Admin/EditChallenge.vue';
import AddChallenge from '../views/Admin/AddChallenge.vue';
import ClubC from '../components/ClubC.vue';
import ClubDetail from '../components/ClubDetail.vue';
import ChallengeForm from '@/components/ChallengeForm.vue';
import PostManagement from '../views/Admin/PostManagement.vue';
import HeaderAdmin from '../views/Admin/HeaderAdmin.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/AppHome'
        },
        {
            path: '/AppHome',
            name: 'AppHome',
            component: AppHome
        },
        {
            path: '/login',
            name: 'LogIn',
            component: LogIn
        },
        {
            path: '/register',
            name: 'Register',
            component: PageRegister
        },
        {
            path: '/introduce',
            name: 'Introduce',
            component: PageIntroduce
        },
        {
            path: '/challenge',
            name: 'Challenge',
            component: ChallengeC
        },
        {
            path: '/ranking',
            name: 'Ranking',
            component: RanKing
        },
        {
            path: '/club',
            name: 'Club',
            component: ClubC
        },
        {
            path: '/club/:id/:userId',
            name: 'ClubDetail',
            component: ClubDetail,
            props: true
        },
        {
            path: '/news',
            name: 'News',
            component: NewS
        },
        {
            path: '/profile',
            name: 'Profile',
            component: PageProfile
        },
        {
            path: '/challenge/:id',
            name: 'ChallengeDetail',
            component: ChallengeDetail,
            props: true
        },
        {
            path: '/edit-challenge/:id',
            name: 'EditChallenge',
            component: EditChallenge,
            props: true
        },
        {
            path: '/add-challenge',
            name: 'AddChallenge',
            component: AddChallenge 
        },
        {   
            path: '/challenge/:id/form',
            name:'ChallengeForm',
            component: ChallengeForm,
            props: true
        },
        {
            path: '/admin',
            component: AdminDashboard,
            meta: {
                requiresAuth: true,
                role: 'admin'
            },
            name: 'AdminDashboard',
            children: [
                { path: 'header-admin', component: HeaderAdmin, name: 'HeaderAdmin' },
                { path: 'challenge-management', component: ChallengeManagement, name: 'ChallengeManagement' },
                { path: 'user-management', component: UserManagement, name: 'UserManagement' },
                { path: 'club-management', component: ClubManagement, name: 'ClubManagement' },
                { path: 'statistical', component: Statistical, name: 'Statistical' },
                { path: 'setting', component: Setting, name: 'Setting' },
                { path: 'post-management', component: PostManagement, name: 'PostManagement' },
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({ path: '/' });
      } else if (to.meta.role && user.role !== to.meta.role) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      next();
    }
  });


export default router;