export const url = "https://itunes.apple.com";

export let xhr = {} || null;

export function request(action, data, endpoint) {
	let params = typeof data === 'string' ? data : Object.keys(data).map((k) => {
	    //for handling multiple values for same parameter variable
		if(typeof data[k] === "string" && data[k].indexOf(k)){
			return encodeURIComponent(k) + '=' + (data[k]);
		}
		else {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);		
		}
	}).join('&');

	let usePostUrl = [url , "/" , endpoint].join("");
	let useGetUrl = [url, "/", endpoint , "?", params].join("");

	let fullUrltoRequest = (action === 'GET') ? useGetUrl: usePostUrl;

	return new Promise( function (resolve, reject) {

        xhr = window.XMLHttpRequest ? new XMLHttpRequest() : {};

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(this.responseText));
            } else {
                // Something went wrong (404 etc.)
                reject(new Error(this.statusText));
            }
        };

        xhr.onerror = function () {
            reject(new Error('XMLHttpRequest Error: '+this.statusText));
        };

        xhr.open(action, fullUrltoRequest);       
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        if(action === 'POST'){
        	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
    	}
    	else {
    		xhr.send();	
    	}	
    });
}
