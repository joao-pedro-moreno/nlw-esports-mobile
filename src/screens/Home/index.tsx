import React, { useEffect, useState } from  'react'

import { Image, FlatList } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading'
import { Gamecard, GamecardProps } from '../../components/Gamecard';
import { Background } from '../../components/Background';

import { useNavigation } from '@react-navigation/native'

export function Home() {
    const [games, setGames] = useState<GamecardProps[]>([])

    const navigation = useNavigation()

    function handleOpenGame({ id, title, bannerUrl }: GamecardProps) {
        navigation.navigate('game', { id, title, bannerUrl })
    }

    useEffect(() => {
        fetch('http://192.168.100.3:3333/games')
            .then(response => response.json())
            .then(data => setGames(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />
                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentList}
                    renderItem={({item}) => (
                        <Gamecard data={item} onPress={() => handleOpenGame(item)} />
                    )}
                />
            </SafeAreaView>
        </Background>
    );
}