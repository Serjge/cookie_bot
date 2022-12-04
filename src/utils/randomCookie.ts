type RandomCookieProps = {
  cookie:string
}

export const randomCookie = (cookies: RandomCookieProps[]) => {
  const key = Math.round(Math.random() * cookies.length) - 1;

  if (key < cookies.length) {
    return cookies[key].cookie;
  }

  return 'Пустая попробуй еще раз!';
};
