import React, { useMemo } from 'react'
import { Image } from 'react-native'

import Logotipo from '~/assets/logotipo/logotipo.png'

import { Flex, Button, Text, Loader } from '../../atoms'
import { AppPage, HomeItem, IAppPage } from '../../molecules'

export type TAuthItem = 'login' | 'logout' | 'register'
export type TMenuItem = 'calendar' | 'vaccineCertificate' | 'local' | 'notification'

export interface IHomeTemplate extends Omit<IAppPage, 'children' | 'scroll'> {
  testID?: string
  isAuthenticated?: boolean
  username?: string
  onPressAuthItem: (item: TAuthItem) => void
  onPressMenuItem: (item: TMenuItem) => void
  authIsLoading: boolean
}

export const HomeTemplate: React.FC<IHomeTemplate> = ({
  testID = 'HomeTemplate',
  isAuthenticated = false,
  username = '',
  onPressAuthItem,
  onPressMenuItem,
  authIsLoading,
  ...props
}) => {
  const authItems = useMemo(() => {
    if (authIsLoading) {
      return (
        <Flex alignItems='center' justifyContent='center'>
          <Loader />
        </Flex>
      )
    }

    if (isAuthenticated) {
      return (
        <Flex flexDirection='row' alignItems='flex-end'>
          <Flex flex={1} marginStyle='0 16px 0 0'>
            <Text size={26}>Bem-Vindo,{'\n'}{username}</Text>
          </Flex>
          <Flex flex={1}>
            <Button text='sair' mode='outlined' onPress={() => onPressAuthItem('logout')}/>
          </Flex>
        </Flex>
      )
    }

    return (
      <Flex flexDirection='row'>
        <Button flex={1} text='login' onPress={() => onPressAuthItem('login')} marginStyle='0 16px 0 0' />
        <Button flex={1} text='cadastrar' mode='outlined' onPress={() => onPressAuthItem('register')} />
      </Flex>
    )
  }, [authIsLoading, isAuthenticated, onPressAuthItem, username])

  return (
    <AppPage {...props} testID={testID} scroll>
      <Flex flex={1} alignItems='center' justifyContent='center' marginStyle={16}>
        <Image source={Logotipo} />
      </Flex>
      <Flex flex={2} justifyContent='center'>
        <Flex>
          {authItems}
        </Flex>
        <Flex marginStyle='16px 0 0'>
          <Flex flexDirection='row'>
            <HomeItem gap icon='calendar' text='calendarios de vacinação' onPress={() => onPressMenuItem('calendar')} />
            <HomeItem icon='badge-account-horizontal-outline' text='carteira de vacinação' onPress={() => onPressMenuItem('vaccineCertificate')} />
          </Flex>
          <Flex flexDirection='row' marginStyle='16px 0 0'>
            <HomeItem gap icon='bell' text='lembretes de vacina' onPress={() => onPressMenuItem('notification')} />
            <HomeItem icon='map-marker' text='locais de vacinação' onPress={() => onPressMenuItem('local')} />
          </Flex>
        </Flex>
      </Flex>
    </AppPage>
  )
}
