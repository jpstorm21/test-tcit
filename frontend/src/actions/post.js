import axios from "axios";
import { URL } from "../config.json";

// type loading, success and error
export const LOADING_POST = "LOADING_POST";
export const ERROR_REQUEST = "ERROR_REQUEST";
export const SUCCESS_REQUEST = "SUCCESS_REQUEST";

const loadingPost = () => {
  return {
    type: LOADING_POST,
  };
};

const successPost = (data) => {
  return {
    type: SUCCESS_REQUEST,
    data,
  };
};

const errorRequest = () => {
  return {
    type: ERROR_REQUEST,
  };
};

export const getPost = () => async (dispatch) => {
  try {
    dispatch(loadingPost());
    const response = await axios.get(`${URL}api/posts/`);
    const { status } = response;
    if (status === 200) {
      const { data } = response;
      dispatch(successPost(data));
    } else {
      dispatch(errorRequest());
    }
  } catch (error) {
    dispatch(errorRequest());
  }
};

export const newPost = (post) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { name, description } = post;
    dispatch(loadingPost());
    const response = await axios.post(`${URL}api/posts/register`, post);
    const { status } = response;
    if (status === 200) {
      const { id } = response.data;
      const { data } = state.post;
      data.push({ id, name, description });
      dispatch(successPost(data));
    } else {
      dispatch(errorRequest());
    }
  } catch (error) {
    dispatch(errorRequest());
  }
};

export const editPost = (post) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { id } = post;
    dispatch(loadingPost());
    const response = await axios.put(`${URL}api/posts/edit`, post);
    const { status } = response;
    if (status === 200) {
      const { data } = state.post;
      var index = data.findIndex(post => post.id === id);
      data[index] = post;
      dispatch(successPost(data));
    } else {
      dispatch(errorRequest());
    }
  } catch (error) {
    dispatch(errorRequest());
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    const state = getState();
    dispatch(loadingPost());
    const response = await axios.delete(`${URL}api/posts/delete/${id}`);
    const { status } = response;
    if (status === 200) {
      const { data } = state.post;
      let newPosts = data.filter(post => post.id !== id);
      dispatch(successPost(newPosts));
    } else {
      dispatch(errorRequest());
    }
  } catch (error) {
    dispatch(errorRequest());
  }
};