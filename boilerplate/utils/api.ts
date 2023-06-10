export const fetcher = ({
  url,
  method = "GET",
  body = null,
}: {
  url: string;
  method?: string;
  body?: object | null;
}) => {
  return fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : null,
  }).then((res) => res.json());
};
