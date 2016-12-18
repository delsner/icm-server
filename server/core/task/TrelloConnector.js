import config from '../../../config/env';
import TaskConnector from './TaskConnector';
import fetch from 'node-fetch';

class TrelloConnector extends TaskConnector {
  constructor(options) {
    super(options);
    this.accessToken = this.options.trelloAccessToken;
    this.accessTokenSecret = this.options.trelloAccessTokenSecret;
  }

  /**
   * taskGetAll
   * @params {string} - idList (required).
   */
  taskGetAll(params) {
    const idList = params.idList;
    const url = this.buildURL(`/lists/${idList}/cards`, params);
    return new Promise((resolve, reject) => {
      fetch(url).then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  /**
   * create task
   * @params {string} - idList (required).
   * @params {string} - name (desirable).
   */
  createTask(params) {
    const url = this.buildURL('/cards', params);
    return new Promise((resolve, reject) => {
      fetch(url, {method: 'POST', body: ''})
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  /**
   * get task
   */
  getTask(id) {
    const url = this.buildURL(`/cards/${id}`, '');
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  /**
   * update task
   * @params {string} - name (optional).
   */
  updateTask(id, params) {
    const url = this.buildURL(`/cards/${id}`, params);
    return new Promise((resolve, reject) => {
      fetch(url, {method: 'PUT', body: ''})
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  /**
   * delete tasks
   */
  deleteTask(id) {
    const url = this.buildURL(`/cards/${id}`, '');
    return new Promise((resolve, reject) => {
      fetch(url, {method: 'DELETE', body: ''})
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  /**
   * search tasks
   * @params {string} - query (required).
   */
  search(params) {
    const url = this.buildURL('/search', params);
    return new Promise((resolve, reject) => {
      fetch(url).then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  /* Trello Connector utils */
  buildURL(path, params) {
    return `${config.trello.baseURL}${path}?`
      + `key=${config.trello.key}&`
      + `token=${this.accessToken}&`
      + `${this.addQueries(params)}`;
  }

}

export default TrelloConnector;