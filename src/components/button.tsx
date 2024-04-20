import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";

type props = TouchableOpacityProps & {
    title: string,
    isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest}: props) {
    return(
        <TouchableOpacity 
            activeOpacity={.7 }
            disabled={isLoading}
            className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg"
            {...rest}
        >
            {
                isLoading ? <ActivityIndicator className="text-green-500"/> :
                <Text className="text-green-500 text-base uppercase">{title}</Text>
            }
        </TouchableOpacity>
    )
}