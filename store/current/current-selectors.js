const getCurrentRelease = state => state.current.currentRelease;
const getCurrentUser = state => state.current.currentUser;
const getCurrentBap = state => state.current.currentBap;
const getCurrentTab = state => state.current.currentTab;

const currentSelectors = {
  getCurrentRelease,
  getCurrentUser,
  getCurrentBap,
  getCurrentTab,
};

export default currentSelectors;
