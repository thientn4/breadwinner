import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (error) {
        //console.log('Error storing data: ', error);
        return false
    }
};

export const retrieve = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        //console.log('Error retrieving data: ', error);
        return null;
    }
};

export const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        //console.log('Error removing data: ', error);
        return false;
    }
};    

export const clear = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        //console.log('Error clearing data: ', error);
        return false;
    }
}; 

  