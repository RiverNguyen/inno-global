interface PurposeRepeatItem {
  image: string;
  title: string;
  desc: string;
}

interface PurposeDetail {
  title: string;
  purpose_repeat: PurposeRepeatItem[];
}

interface Acf {
  desc: string;
  purpose: PurposeDetail[];
}

interface RootObject {
  acf: Acf;
}

export type { PurposeRepeatItem, PurposeDetail, Acf, RootObject };
