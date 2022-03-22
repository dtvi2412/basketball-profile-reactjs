import { createSlice } from '@reduxjs/toolkit';
import logoHeader from '../Assets/img/logoNba.png';
import logoTeam from '../Assets/img/logoS.png';
import avatar from '../Assets/img/me-anime.png';

const initialState = {
  header: {
    logo: logoHeader,
    name: 'NBA',
  },
  leftNav: true,
  avatar: avatar,
  content: {
    firstName: 'Đặng',
    lastName: 'Vỉ',
    logoTeam: logoTeam,
    nameTeam: 'CL South',
    numberShirt: 24,
    abbreviated: 'South',
    height: 170,
    weight: 80,
    position: 'SF',
  },
  profile: {
    born: '1998-12-24',
    age: 23,
    from: 'Đồng Tháp',
    debut: '2019-10-10',
    previously: 'NH 2019/21',
  },
  score: {
    points: 35,
    rebounds: 6.7,
    assists: 7.1,
  },
};

const core = createSlice({
  name: 'core',
  initialState,
  reducers: {
    updateProfile(state, action) {
      state.content = action.payload.content;
      state.profile = action.payload.profile;
      state.score = action.payload.score;
      state.avatar = action.payload.avatar;
    },
    updateAvatar(state, action) {
      state.avatar = action.payload.avatar;
    },
    uploadLogoTeam(state, action) {
      state.content.logoTeam = action.payload.logoTeam;
    },
  },
});

export default core.reducer;

export const { updateProfile, updateAvatar, uploadLogoTeam } = core.actions;
