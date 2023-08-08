import { TronçonStatus, TypeMOA } from "@/app/types";

export const statusLabel = {
  [TronçonStatus.PreExisting]: "Pré-existant au 01/01/2022",
  [TronçonStatus.Built]: "Livré",
  [TronçonStatus.Building]: "En travaux",
  [TronçonStatus.Planned]: "En cours de discussion",
  [TronçonStatus.Blocked]: "Au point mort",
  [TronçonStatus.SecondPhase]: "Phase 2 (2030)",
  [TronçonStatus.Unknown]: "Inconnu",
};

export const statusColor = {
  [TronçonStatus.PreExisting]: "#60AE73",
  [TronçonStatus.Built]: "#2ee35c",
  [TronçonStatus.Building]: "#fff200",
  [TronçonStatus.Planned]: "#ff8400",
  [TronçonStatus.Blocked]: "#DA2F4C",
  [TronçonStatus.SecondPhase]: "#FFF",
  [TronçonStatus.Unknown]: "#7E7E7E",
};

export const fadedStatusColor = {
  [TronçonStatus.PreExisting]: "#a3d1af",
  [TronçonStatus.Built]: "#8aefa4",
  [TronçonStatus.Building]: "#f0ea75",
  [TronçonStatus.Planned]: "#f7b56e",
  [TronçonStatus.Blocked]: "#ea8696",
  [TronçonStatus.SecondPhase]: "#FFF",
  [TronçonStatus.Unknown]: "#b3b3b3",
};

export const moaLabel = {
  [TypeMOA.Commune]: "Commune",
  [TypeMOA.Departement]: "Département",
  [TypeMOA.EPCI]: "",
  [TypeMOA.Unknown]: "",
};
