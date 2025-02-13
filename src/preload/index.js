import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  fetchFamilyMembers: () => ipcRenderer.invoke('fetchFamilyMembers'),
  calculateBudgetRatio: (familyMemberId) => ipcRenderer.invoke('calculateBudgetRatio', familyMemberId),
  addFamilyMember: (member) => ipcRenderer.invoke('addFamilyMember', member),
  modifyFamilyMember: (member) => ipcRenderer.invoke('modifyFamilyMember', member),
});