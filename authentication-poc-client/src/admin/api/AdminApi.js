import {ACCESS_TOKEN, API_BASE_URL_ACTUATOR, API_BASE_URL} from "../../config/Config";

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
        method: 'GET'
    });
}

export function getHttpTraces(){
    return sendRequest({
        url: API_BASE_URL_ACTUATOR + "/httptrace",
        method: 'GET'
    });
}

export function getApiUptime() {
    return sendRequest({
        url: API_BASE_URL_ACTUATOR + "/metrics/process.uptime",
        method: 'GET'
    })
}

export function getJvmMemUsed() {
    return sendRequest({
        url: API_BASE_URL_ACTUATOR + "/metrics/jvm.memory.used",
        method: 'GET'
    });
}

export function getJvmMemMax() {
    return sendRequest({
        url: API_BASE_URL_ACTUATOR + "/metrics/jvm.memory.max",
        method: 'GET'
    });
}

export function getCpuUsage() {
    return sendRequest({
        url: API_BASE_URL_ACTUATOR + "/metrics/system.cpu.usage",
        method: 'GET'
    });
}

export function getCpuCount() {
    return sendRequest({
        url: API_BASE_URL_ACTUATOR + "/metrics/system.cpu.count",
        method: 'GET'
    });
}

export function getPageUsers(pageable){

    if(pageable){
        return sendRequest({
            url: API_BASE_URL + "/secure/admin/dashboard/users?page=" + pageable.pageNumber,
            method: 'GET'
        });
    } else {
        return sendRequest({
            url: API_BASE_URL + "/secure/admin/dashboard/users?page=0",
            method: 'GET'
        });
    }

}