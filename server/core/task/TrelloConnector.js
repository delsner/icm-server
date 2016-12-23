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
   * create task
   * @params {string} - idList (required).
   * @params {string} - name (desirable).
   */
  createTask(body) {
    const url = this.buildURL('/cards', '');
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
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
  updateTask(id, body) {
    const url = this.buildURL(`/cards/${id}`, '');
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
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
      fetch(url, {
          method: 'DELETE'
        })
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

  /**
   * get boards
   * @params {string} - query (required).
   */
  getBoardsForMember(params) {
    params['lists'] = 'all';
    const url = this.buildURL(`/members/${this.options.trelloId}/boards`, params);
    console.log(url);
    return new Promise((resolve, reject) => {
      fetch(url).then((res) => res.json())
        .then((json) => {
          console.log(json);
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  /**
   * get lists from board
   * @params {string} - query (required).
   */
  getListsForBoard(boardId, params) {
    const url = this.buildURL(`/boards/${boardId}/lists`, params);
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
   * get cards from list
   * @params {string} - query (required).
   */
  getCardsForList(listId, params) {
    const url = this.buildURL(`/lists/${listId}/cards`, params);
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
    return `${config.trello.baseURL}${path}?` +
      `key=${config.trello.key}&` +
      `token=${this.accessToken}` +
      `${this.addQueries(params)}`;
  }

}

export default TrelloConnector;
