export interface DrawerButton {
  id: string;
  title: string;
  icon: string;
  onClick?: () => void;
}

export interface DrawerSection {
  title: string;
  buttons: DrawerButton[];
}

export interface DrawerConfig {
  sections: DrawerSection[];
}