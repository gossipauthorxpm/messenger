import axios, {AxiosError, AxiosInstance} from 'axios';
import {_refreshToken} from "@/app/@axios/api/auth/_refreshToken";
import {_auth} from "@/app/@axios/api/auth/_auth";
import {_getUserInfo} from "@/app/@axios/api/user/_getUserInfo";
import {_cookies} from "@/app/@axios/_cookies";
import {_register} from "@/app/@axios/api/auth/_register";
import {_updateUserInfo} from "@/app/@axios/api/user/_updateUserInfo";
import _getAllFriendsCurrentUser from "@/app/@axios/api/user/friends/_getAllFriendsCurrentUser";
import _deleteUserFromFriends from "@/app/@axios/api/user/friends/_deleteUserFromFriends";
import _getAllTakenFriendsRequests from "@/app/@axios/api/user/friends/_getAllTakenFriendsRequests";
import _sendFriendRequest from "@/app/@axios/api/user/friends/_sendFriendRequest";
import _declineFriendRequest from "@/app/@axios/api/user/friends/_declineFriendRequest";
import _acceptFriendRequest from "@/app/@axios/api/user/friends/_acceptFriendRequest";
import _getAllChats from "@/app/@axios/api/messenger/_getAllChats";
import _getAllMessagesFromChat from "@/app/@axios/api/messenger/_getAllMessagesFromChat";
import _sendMessageChat from "@/app/@axios/api/messenger/_sendMessage";
import _readMessage from "@/app/@axios/api/messenger/_readMessage";
import _createSingleChat from "@/app/@axios/api/messenger/singleChat/_createSingleChat";
import _deleteSingleChat from "@/app/@axios/api/messenger/singleChat/_deleteSingleChat";
import _createGroupChat from "@/app/@axios/api/messenger/groupChats/_createGroupChat";
import _deleteGroupChat from "@/app/@axios/api/messenger/groupChats/_deleteGroupChat";
import _addUserToGroupChat from "@/app/@axios/api/messenger/groupChats/_addUserToGroupChat";
import _deleteUserFromGroupChat from "@/app/@axios/api/messenger/groupChats/_deleteUserFromGroupChat";
import _deleteMessageFromGroupChat from "@/app/@axios/api/messenger/groupChats/_deleteMessageFromGroupChat";


export const _WEBSERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER;


export const _web: AxiosInstance = axios.create({
    baseURL: _WEBSERVER,
    timeout: 5000,
    headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",

    },

})

_web.interceptors.request.use(function (config) {
    if (config.url === `/api/auth/login/refresh/${_cookies.get("refreshToken")}`) return config
    let token = _cookies.get("authToken");
    if (token == null) return config
    config.headers.Authorization = "Bearer " + token;
    return config;
});

// TODO INFINITY LOOP WHERE 403 RESPONSE
_web.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 403 && originalRequest) {
            try {
                const newAuthToken = await _refreshToken();
                _cookies.set("authToken", newAuthToken)
                return _web(originalRequest)
            } catch (error) {
                _cookies.remove("refreshToken")
                _cookies.remove("authToken")
            }
        }
        return Promise.reject(error)
    }
)

export const _api = {
    web: _web,
    requests: {
        auth: {
            refreshToken: _refreshToken,
            login: _auth,
            register: _register,
        },
        user: {
            userInfo: _getUserInfo,
            updateUser: _updateUserInfo,
            friends: {
                getAllFriendsCurrentUser: _getAllFriendsCurrentUser,
                deleteFriend: _deleteUserFromFriends,
                getAllTakenFriendsRequests: _getAllTakenFriendsRequests,
                sendFriendRequest: _sendFriendRequest,
                declineFriendRequest: _declineFriendRequest,
                acceptFriendRequest: _acceptFriendRequest,
            }
        },
        messenger: {
            getAllChats: _getAllChats,
            chat: {
                getAllMessagesChat: _getAllMessagesFromChat,
                sendMessage: _sendMessageChat,
                readMessage: _readMessage,
                single: {
                    create: _createSingleChat,
                    delete: _deleteSingleChat,
                },
                group: {
                    create: _createGroupChat,
                    delete: _deleteGroupChat,
                    addUser: _addUserToGroupChat,
                    deleteUser: _deleteUserFromGroupChat,
                    deleteMessage: _deleteMessageFromGroupChat,
                }
            },
        }
    }
}