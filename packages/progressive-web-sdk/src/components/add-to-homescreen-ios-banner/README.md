```js static
// JS import
import AddToHomescreenIosBanner from 'progressive-web-sdk/dist/components/add-to-homescreen-ios-banner';

// SCSS import
@import 'node_modules/progressive-web-sdk/dist/components/add-to-homescreen-ios-banner/base';
@import 'node_modules/progressive-web-sdk/dist/components/add-to-homescreen-ios-banner/theme';
```

This component is for IOS devices. It's a banner with a triangle pointing to the "Share" button of the Safari browser.
The content of the banner is the instructions on how to add the Web Application to the home screen of the IOS device. 

A typical use case for this component is to remind the user to add the web application to the home screen after the user
has completed an order.

## Example Usage
The banner is only supposed to show on the safari browser of an ios device, but if you really want to show it on any device, you
can use the `inlineDisplay` props. 
```jsx
<AddToHomescreenIosBanner inlineDisplay />
```
## Example with Customizing the Instruction Text.
If you want to customize the instruction text, you can overwrite the default text by setting the instructionText
props with the new text. Because there is a Safari share icon in the instruction, in your new text, you need
to substitute the icon with the string "&icon". This instructionText props is useful for i18n.
```jsx
<AddToHomescreenIosBanner
    inlineDisplay
    instructionText="To add this app to homescreen: tap &icon and then tap Add to Home Screen"
/>
```

## Example with Using A Button to Trigger the Banner
```jsx
class AddToHomeScreenButton extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            showBanner: false,
        };

        this.toggleBanner = this.toggleBanner.bind(this);
    }

    toggleBanner() {
        this.setState((prevState) => {
            return {
                showBanner: !prevState.showBanner
            }
        });
    }

    render() {
        return <div>
            <Button
                className='pw--primary'
                onClick={this.toggleBanner}
            >
                {this.state.showBanner ? 'Close The Banner' : 'Add To Homescreen'}
            </Button>
            { this.state.showBanner && <AddToHomescreenIosBanner closeBannerCallback={this.toggleBanner} inlineDisplay /> }
        </div>
    }
}
<AddToHomeScreenButton />
```
## Example with only Showing the Button on Safari Browser of An IOS Device

This example is just to show how to decide whether we need to show the banner and how to show it.

If you are reading this page from the Safari browser on an IOS device, you should be able to see the "Add To Homescreen"
button below (Using the developer tool on Chrome or Firefox to set the device to an ios device would also work).
Otherwise, you will only see a blank field.
```jsx
class AddToHomeScreenButton extends React.Component {
    constructor (props) {
        super(props);

        // Detect if the browser is Safari
        const isSafari = () => {
            var userAgent = navigator.userAgent.toLowerCase(); 
            console.log('User agent', userAgent)
            return userAgent.indexOf('safari') !== -1;
        }

        // Detect if the device is an iPhone or and iPad.
        const isIPhoneOrIPad = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad/.test( userAgent );
        };

        // Detects if application is in standalone mode(If the application is in standalone mode, that means it has
        // already been added to the home screen and is opened from the application on the home screen).
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        this.state = {
            showBanner: false,
            showButton: isSafari() && isIPhoneOrIPad() && !isInStandaloneMode()
        };

        this.toggleBanner = this.toggleBanner.bind(this);
    }

    toggleBanner() {
        this.setState((prevState) => {
            return {
                showBanner: !prevState.showBanner
            }
        });
    }

    render() {
        if (!this.state.showButton) {
            return null    
        }
        return <div>
            <Button
                className='pw--primary'
                onClick={this.toggleBanner}
            >
                {this.state.showBanner ? 'Close The Banner' : 'Add To Homescreen'}
            </Button>
            { this.state.showBanner && <AddToHomescreenIosBanner closeBannerCallback={this.toggleBanner} /> }
        </div>
    }
}
<AddToHomeScreenButton />
```