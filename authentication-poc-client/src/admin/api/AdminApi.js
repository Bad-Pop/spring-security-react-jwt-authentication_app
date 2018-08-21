import {ACCESS_TOKEN, API_BASE_URL_ACTUATOR} from "../../config/Config";

const sendRequest = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(
            response =>
                response.json()
                    .then(
                        json => {
                            if (!response.ok) {
                                return Promise.reject(json)
                            }
                            return json;
                        }
                    )
        )
};

export function checkHealth(){
    return sendRequest({
       url: API_BASE_URL_ACTUATOR + "/health",
        method: 'GET',
        mode: 'cors'
    });
}