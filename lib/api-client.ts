type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: string;
};

export async function ApiClient(url: string, options: FetchOptions) {
    const { body, headers = {}, method = "GET" } = options;
    const defaultHeaders = {
        "Content-Type": "application/json",
        ...headers,
    };
    const response = await fetch(url, {
        method,
        body,
        headers: defaultHeaders,
        
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`API request failed with status ${response.status}: ${response.text}`);

    }
}