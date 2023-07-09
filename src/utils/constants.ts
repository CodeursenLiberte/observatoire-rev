import { TronçonStatus, TypeMOA } from "@/app/types"

export const statusLabel = {
  [TronçonStatus.PreExisting]: "Pré-existant au 01/01/2022",
  [TronçonStatus.Built]: "Livré",
  [TronçonStatus.Building]: "En travaux",
  [TronçonStatus.Planned]: "En cours de discussion",
  [TronçonStatus.Blocked]: "Au point mort",
  [TronçonStatus.Unknown]: "Inconnu",
}

export const statusColor = {
  [TronçonStatus.PreExisting]: "#60AE73",
  [TronçonStatus.Built]: "#2ee35c",
  [TronçonStatus.Building]: "#fff200",
  [TronçonStatus.Planned]: "#ff8400",
  [TronçonStatus.Blocked]: "#F84E45",
  [TronçonStatus.Unknown]: "#7E7E7E",
}

export const moaLabel = {
  [TypeMOA.Commune]: 'Commune',
  [TypeMOA.Departement]: 'Département',
  [TypeMOA.EPCI]: '',
  [TypeMOA.Unknown]: ''
}
