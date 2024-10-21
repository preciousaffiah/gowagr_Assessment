export function capitalizeFletter(word: string) { //capitalize first letter of a word
    const lowercasedWord = word.toLowerCase();
  
    // Uppercase the first character and concatenate it with the rest of the word
    const capitalizedWord = lowercasedWord.charAt(0).toUpperCase() + lowercasedWord.slice(1);
  
    return capitalizedWord;
  }