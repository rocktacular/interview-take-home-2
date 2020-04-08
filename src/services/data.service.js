import demoData from "../data/demoData";

const dataService = {
  getData: () => {
    return new Promise((resolve, reject) => {
      resolve(demoData);
    });
  },
};

export default dataService;
