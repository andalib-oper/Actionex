import { StyleSheet, Text, Modal as RNModal } from 'react-native'
import React from 'react'

const Modal = ({
    children,
    isVisible,
    onRequestClose
}:{
    children: React.ReactNode;
    isVisible: boolean;
    onRequestClose: () => void;
}) => {
    return (
     <RNModal onRequestClose={onRequestClose} visible={isVisible} animationType="slide">
        {children}
     </RNModal>
    )
}

export default Modal

const style = StyleSheet.create({})