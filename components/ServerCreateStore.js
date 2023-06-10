import { create } from "zustand";

const ServerCreateStore = create((set) => ({
  pickedContent: "",
  basicInfo: {},
  teamNumber: 0,
  setPickedContent: (content) =>
    set({
      pickedContent: content,
    }),
  setBasicInfo: (info) =>
    set({
      basicInfo: info,
    }),
  setTeamNumber: (team) =>
    set({
      teamNumber: team,
    }),
}));

export default ServerCreateStore;
