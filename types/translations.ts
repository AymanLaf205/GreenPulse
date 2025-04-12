export interface Translations {
  app: {
    title: string;
    subtitle: string;
    language: string;
  };
  plant: {
    add: string;
    edit: string;
    name: string;
    namePlaceholder: string;
    wateringFrequency: string;
    wateringPlaceholder: string;
    sunlight: string;
    sunlightPlaceholder: string;
    imageUrl: string;
    imagePlaceholder: string;
    waterNow: string;
    waterConfirm: string;
    waterSuccess: string;
    delete: string;
    deleteConfirm: string;
    lastWatered: string;
    nextWatering: string;
    waterEvery: string;
    sunlightOptions: {
      brightDirect: string;
      brightIndirect: string;
      mediumLight: string;
      lowLight: string;
      shade: string;
    };
    validation: {
      nameRequired: string;
      wateringRequired: string;
      sunlightRequired: string;
    };
  };
  actions: {
    save: string;
    cancel: string;
    confirm: string;
    delete: string;
  };
  errors: {
    generic: string;
  };
}
