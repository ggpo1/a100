import SignaturePosition from './../Enums/SignaturePosition';

interface SignatureItem {
    title: string,
    position: SignaturePosition,
    stillageID?: number,
}

export default SignatureItem;