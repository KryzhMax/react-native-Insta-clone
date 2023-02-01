export const selectIsAuth = (state) => state.auth.isAuth;

export const selectName = (state) => state.auth.name;
export const selectEmail = (state) => state.auth.email;

// _____________Сетить аву в стейт
export const selectPhoto = (state) => state.auth.avatar;
// export const selectAva = (state) => state.auth.PhotoURL;

// _____________

export const selectUserId = (state) => state.auth.userId;
