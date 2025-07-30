
export interface PhoneModel {
  name: string;
  image: string;
  storage: {
    [size: string]: number;
  };
  faults: {
    [fault: string]: number;
  };
}


export type DamageOption = {
  id: string
  label: string
  discount: number
}

