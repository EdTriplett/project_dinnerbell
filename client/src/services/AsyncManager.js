import superagent from "superagent";

export default {
  getRequest: async (path, params) => {
    const response = await superagent
      .get(path)
      .set("Accept", "application/json")
      .query(params);

    return response.body;
  },

  postRequest: async (path, params) => {

      const response = await superagent
      .post(path)
      .set("Accept", "application/json")
      .send(params);

      return response.body;
  },

  patchRequest: async (path, params) => {
    const response = await superagent
      .patch(path)
      .set("Accept", "application/json")
      .send(params);
    return response.body;
  },

  uploadFile: (url, file, params) => {
    return new Promise((resolve, reject) => {
      let uploadRequest = superagent.post(url);
      uploadRequest.attach("photo", file);

      if (params) {
        Object.keys(params).forEach(key => {
          uploadRequest.field(key, params[key]);
        });
      }

      uploadRequest.end((err, response) => {
        if (err) {
          reject(err);
          return;
        }

        const uploaded = response.body;

        console.log(uploaded, "uploaded file is here");

        resolve(uploaded);
      });
    });
  }
};
