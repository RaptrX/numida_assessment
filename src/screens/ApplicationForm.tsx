import React, { useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { background, primary, white } from '../constants/colours'
import { large, medium, scale, small } from '../constants/dimensions'
import { buttonContainer } from '../constants/styles'
import { postApplyLoan } from '../services/rest/postEPs'
import { useNavigation } from '@react-navigation/native'

const Screen = () => {
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [amount, setAmount] = useState<number | undefined>()
    const [purpose, setPurpose] = useState<string>('')
    const [fullNameError, setFullNameError] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<boolean>(false)
    const [amountError, setAmountError] = useState<boolean>(false)
    const [purposeError, setPurposeError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const navigation = useNavigation()

    if (error) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={primary} style={{ padding: 50 }} />
                <Text style={{ textAlign: 'center' }}>Error: {error.message}</Text>
            </View >
        )
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError(false)
        if (!fullNameError && !emailError && !amountError && !purposeError &&
            fullName.length > 0 && email.length > 0 && purpose.length > 0
        ) {

            try {
                const response = await postApplyLoan({
                    name: fullName,
                    email: email,
                    amount: amount!,
                    purpose: purpose
                })

                if (response.message === 'Loan application submitted successfully.') {

                    setFullName('')
                    setEmail('')
                    setAmount(undefined)
                    setPurpose('')

                    navigation.navigate("Applications")
                } else {
                    setError(true)
                }
            } catch (e) {
                console.log(e)
                setError(true)
            }

        }
        setLoading(false)
    }



    return (
        <SafeAreaView style={styles.main}>
            <TextInput
                style={[styles.input,
                {
                    borderWidth: fullNameError ? 1 : 0,
                    borderColor: fullNameError ? 'red' : 'white'
                }]}
                value={fullName}
                onChangeText={(value) => {
                    setFullName(value)
                    if (value.length === 0) {
                        setFullNameError(true)
                    } else {
                        setFullNameError(false)
                    }
                }}
                placeholder="Please enter your full name"
                inputMode='text'
                autoCapitalize='words' />
            <TextInput
                style={[styles.input,
                {
                    borderWidth: emailError ? 1 : 0,
                    borderColor: emailError ? 'red' : 'white'
                }]}
                value={email}
                onChangeText={(value) => {
                    setEmail(value)
                    if (value.length < 5 || !value.includes("@") || !value.includes('.')) {
                        setEmailError(true)
                    } else {
                        setEmailError(false)
                    }
                }}
                placeholder="Please enter your email"
                inputMode='email' />
            <View style={[styles.input, {
                flexDirection: 'row',
                borderWidth: amountError ? 1 : 0,
                borderColor: amountError ? 'red' : 'white',
                alignItems: 'center',
                justifyContent: 'space-between'
            }]}>
                <TextInput
                    value={amount ? amount.toString() : ''}
                    onChangeText={(value) => {
                        const input = parseInt(value, 10)
                        setAmount(input)
                        if (isNaN(input) || input <= 0) {
                            setAmountError(true)
                        } else {
                            setAmountError(false)
                        }
                    }}
                    placeholder="How much would you like to borrow?"
                    inputMode='numeric' />
                <Text>UGX</Text>
            </View>
            <TextInput
                style={[styles.input,
                {
                    height: scale(96),
                    marginBottom: large,
                    paddingVertical: medium,
                    borderWidth: purposeError ? 1 : 0,
                    borderColor: purposeError ? 'red' : 'white'
                }]}
                value={purpose}
                onChangeText={(value) => {
                    setPurpose(value)
                    if (value.length === 0) {
                        setPurposeError(true)
                    } else {
                        setPurposeError(false)
                    }
                }}
                placeholder="What would you like the loan for?"
                inputMode='text'
                multiline />
            <TouchableOpacity
                style={[buttonContainer, { alignSelf: 'center', marginBottom: large }]}
                onPress={() => { handleSubmit() }}>
                {loading ? <ActivityIndicator size="large" color={primary} /> :
                    <Text style={{ fontSize: scale(18), fontWeight: "200" }}>Submit</Text>}
            </TouchableOpacity>
            {error &&
                <Text style={{ textAlign: 'center', color: 'red' }}>Oops, something broke - please try again</Text>
            }
        </SafeAreaView>
    )
}

export default Screen

const styles = StyleSheet.create({
    input: {
        height: scale(48),
        backgroundColor: white,
        marginHorizontal: small,
        marginTop: small,
        borderRadius: small,
        paddingHorizontal: medium,
    },
    main: {
        backgroundColor: background,
        flex: 1,
        justifyContent: 'center'
    },
})