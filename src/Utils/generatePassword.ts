export const generatePassword = (): string => {
    const prefix = "SAF-IRA@";
    const randomPart = Math.random().toString(36).slice(-6).toUpperCase(); 
    return `${prefix}${randomPart}`;
  };
  