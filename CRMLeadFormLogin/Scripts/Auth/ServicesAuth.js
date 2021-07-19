const serviceAuth = (() => {

  const signIn = async ({ User, Password }) => {

    const result = await fetch("/Account/ValidateUser", confi.getConfig("POST", { User, Password }));
    return await result.json();
  };

  return {
    signIn,
  };

})();