import { useState } from "react";
import {
    Modal,
    Share,
    StatusBar,
    Text,
    View ,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"
import * as ImagePiker from "expo-image-picker"
import { Redirect } from "expo-router";

import { MotiView } from "moti"

import { useBadgeStore } from "@/store/badge-store";

import { Credential } from "@/components/credential";
import Header from "@/components/header";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";

export default function Ticket () {
   const [expandQRCode, setExExpandQRCode] = useState(false)
   const badgeStore = useBadgeStore()

    async function handleShare() {
        try {
            if(badgeStore.data?.checkInURL){
                await Share.share({
                    message: badgeStore.data.checkInURL
                })
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Compartilhar", "Não foi pssível compartilhar")
        }
    }

   async function handleSelectImage() {
    try{
        const result = await ImagePiker.launchImageLibraryAsync({
            mediaTypes: ImagePiker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4]
        })

        if(result.assets){
            badgeStore.updateAvatar(result.assets[0].uri)
        }
    }   catch (error) {
        console.warn(error)
        Alert.alert("Foto", "Não foi possíver selecionar a imagem.")
    }
   }

    if(!badgeStore.data?.checkInURL) {
       return <Redirect href="/"/>
    }

    return(
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="default"/>
            <Header title="Minha Credencial" />
            <ScrollView
                className="-mt-28 -z-10"
                contentContainerClassName="px-8 pb-8"
                showsVerticalScrollIndicator={false}
            >
                <Credential
                    data={badgeStore.data}
                    onchangeAvatar={handleSelectImage}
                    onExpandQRCode={() => setExExpandQRCode(true)}
                />
                <MotiView
                from={{
                    translateY: 0
                }}
                animate={{
                    translateY: 10
                }}
                transition={{
                    loop: true,
                    type: "timing",
                    duration: 700
                }}
                >
                    <FontAwesome
                        name="angle-double-down"
                        size={24}
                        color={colors.gray[300]}
                        className="self-center mt-6"
                    />
                </MotiView>

                <Text className="text-white font-bold text-2xl mt-4">
                    Compartilhar credencial
                </Text>
                <Text className="text-white font-regular text-base mt-1 mb-6">
                    {`Mostre ao mundo que você vai participar do evento ${badgeStore.data.eventTitle}`}
                </Text>

                <Button
                    title="Compartilhar"
                    onPress={handleShare}
                />

                <TouchableOpacity
                    activeOpacity={.7}
                    className="mt-10"
                    onPress={() => badgeStore.remove()}
                >
                    <Text className="text-base text-white font-bold text-center">Remover Ingresso</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={expandQRCode}
                statusBarTranslucent
                animationType="fade"
            >
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <QRCode
                        value="teste"
                        size={300}
                    />
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => setExExpandQRCode(false)}
                    >
                        <Text className="font-body text-orange-500 text-center mt-10">Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}