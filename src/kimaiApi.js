const kimaiApi = {
  getRequest: async function(urlAPI, headers, path) {
    const fullPath = urlAPI + path;
    const requestOptions = {
      method: "GET",
      headers: headers
    };
    const result = await fetch(fullPath, requestOptions);
    const resultJson = await result.json();
    return resultJson;
  },
  getProjects: function(urlAPI, headers) {
    return this.getRequest(urlAPI, headers, "projects");
  },
  getCustomers: function(urlAPI, headers) {
    return this.getRequest(urlAPI, headers, "customers");
  },
  getActivities: function(urlAPI, headers) {
    return this.getRequest(urlAPI, headers, "activities");
  },
  getAllReports: function(urlAPI, headers) {
    return this.getRequest(urlAPI, headers, "timesheets?full=true");
  },
  deleteReport: async function(urlAPI, headers, id) {
    const fullPath = urlAPI + "timesheets/" + id;
    const requestOptions = {
      method: "DELETE",
      headers: {
        ...headers,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id
      })
    };
    const result = await fetch(fullPath, requestOptions);
    return result;
  },
  createReport: async function(urlAPI, headers, reportObject) {
    const fullPath = urlAPI + "timesheets";
    const requestOptions = {
      method: "POST",
      headers: {
        ...headers,
        "content-type": "application/json"
      },
      body: JSON.stringify(reportObject)
    };
    const result = await fetch(fullPath, requestOptions);
    const resultJson = await result.json();
    return resultJson;
  },
  saveReport: async function(urlAPI, headers, id, reportObject) {
    const fullPath = urlAPI + "timesheets/" + id;
    const requestOptions = {
      method: "PATCH",
      headers: {
        ...headers,
        "content-type": "application/json"
      },
      body: JSON.stringify(reportObject)
    };
    const result = await fetch(fullPath, requestOptions);
    const resultJson = await result.json();
    return resultJson;
  },
  checkLogin: async function(login = "", token = "", urlAPI = "") {
    const fullPath = urlAPI + "ping";
    const requestOptions = {
      headers: {
        "X-AUTH-USER": login,
        "X-AUTH-TOKEN": token
      }
    };
    const result = await fetch(fullPath, requestOptions);
    try {
      const jsonResult = await result.json();
      return jsonResult && jsonResult.message === "pong";
    } catch (e) {
      return false;
    }
  }
};

export default kimaiApi;
