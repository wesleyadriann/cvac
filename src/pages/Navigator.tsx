import React, { useRef } from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import analytics from '@react-native-firebase/analytics'

import { AppHeader } from '../atomic'

import { Login } from './Login'
import { Home } from './Home'
import { Register } from './Register'
import { Locations } from './Locations'
import { Calendars } from './Calendars'

const Stack = createNativeStackNavigator()

export const Navigator: React.FC = () => {
  const routeNameRef = useRef<string>()
  const navigationRef = useNavigationContainerRef()

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: `/cvac/${currentRouteName}`,
            screen_class: currentRouteName
          })
        }
        routeNameRef.current = currentRouteName
      }}
    >
      <Stack.Navigator initialRouteName='home' screenOptions={{ header: (props) => <AppHeader {...props}/> }}>
        <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='locations' component={Locations} options={{ title: 'Locais' }} />
        <Stack.Screen name='calendars' component={Calendars} options={{ title: 'Calendarios' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}