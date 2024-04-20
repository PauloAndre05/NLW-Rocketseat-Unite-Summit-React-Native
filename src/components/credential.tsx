import {
    Image,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    useWindowDimensions
} from "react-native";

import { Feather } from "@expo/vector-icons"

import { MotiView } from "moti"

import { BadgeStore } from "@/store/badge-store"

import { colors } from "@/styles/colors";

import { QRCode } from "@/components/qrcode";

type Props = {
    data: BadgeStore,
    image?: "string"
    onchangeAvatar?: () => void
    onExpandQRCode?: () => void
}

export function Credential({ data, onchangeAvatar, onExpandQRCode }: Props) {
    const { height } = useWindowDimensions()
    return(
        <MotiView
            className=" w-full self-stretch items-center"
            from={{
                opacity:1,
                translateY: -height,
                rotateZ: "50deg",
                rotateX: "30deg",
                rotateY: "30deg",
            }}
            animate={{
                opacity: 1,
                translateY: 0,
                rotateZ: "0deg",
                rotateX: "0deg",
                rotateY: "0deg",
            }}
            transition={{
                type: "spring",
                damping: 20,
                rotateZ: {
                    damping: 15,
                    mass: 3,
                }
            }}
        >
            <Image
                source={require("@/assets/ticket/band.png")}
                className="w-24 h-52 z-10"
            />
            <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
                <ImageBackground
                    source={require("@/assets/ticket/header.png")}
                    className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
                >
                    <View className="w-full flex-row items-center justify-between">
                        <Text className="text-zinc-50 text-sm font-bold">{data.eventTitle}</Text>
                        <Text className="text-zinc-50 text-sm font-bold">#{data.id}</Text>
                    </View>
                    <View className="w-40 h-40 bg-black rounded-full"/>
                </ImageBackground>
                {
                    data.image ? (
                        <View className="relative">
                            <Image
                                source={{uri: data.image}}
                                className="w-36 h-36 rounded-full -mt-24"
                            />
                            <TouchableOpacity
                                activeOpacity={.7}
                                onPress={onchangeAvatar}
                                className="absolute inset-0 bg-gray-400 right-0 rounded-full p-2"
                            >
                                <Feather
                                    name="camera"
                                    color={colors.green[400]}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    ): (
                        <TouchableOpacity
                            activeOpacity={.9}
                            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
                            onPress={onchangeAvatar}
                        >
                            <Feather
                                name="camera"
                                color={colors.green[400]}
                                size={32}
                            />
                        </TouchableOpacity>
                    )
                }
                <Text className="font-bold text-2xl text-zinc-50 mt-4">{data.name}</Text>
                <Text className="font-regular text-zinc-300 mb-4">{data.email}</Text>

                <QRCode value={data.checkInURL} size={120}/>
                <TouchableOpacity
                    activeOpacity={.7}
                    className="mt-6"
                >
                    <Text
                        className="font-body text-orange-500 text-sm"
                        onPress={onExpandQRCode}
                    >
                        Ampliar QRCode
                    </Text>
                </TouchableOpacity>
            </View>
        </MotiView>
    )
}