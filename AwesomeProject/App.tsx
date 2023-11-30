import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';

const App = () => {

    // Hooks
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
 
    
    // variables
  const snapPoints = useMemo(() => ['50%','50%'], []);

   interface CarouselItem {
    id: string;
    text: string;
   }

   const width = Dimensions.get('window').width;

   const carouselData = useMemo(() => [
    { id: 'item1', text: 'First View Content' },
    { id: 'item2', text: 'Second View Content' }
     ], []);


    // callbacks
     const handleSheetChanges = useCallback((index: number) => {
     console.log('handleSheetChanges', index);
    }, []);


    const renderCarouselItem = useCallback(({item} : { item: CarouselItem }) => (
        <ScrollView style={{ flex: 1 }}>
            <Text style={styles.carouselText}>{item.text}</Text>
        </ScrollView>
    ), []);

    const renderContent = useCallback(() => (
      <View style={{ flex: 1 }}>
          <Carousel
              data={carouselData}
              renderItem={renderCarouselItem}
              width={width}
              height={500} // Adjust as needed
              loop={false}
              onProgressChange={handleProgressChange}

          />
      </View>
  ), [carouselData]);


  

    //Function to Get Gestures Values
    const handleProgressChange = (offsetProgress: any, absoluteProgress:any) => {
      console.log("Offset Progress:", offsetProgress);
      console.log("Absolute Progress:", absoluteProgress);
      // You can use these values as needed
  };

    // Function to open/close Bottom Sheet
      const toggleBottomSheet = () => {
        setIsBottomSheetOpen(!isBottomSheetOpen);
        if (isBottomSheetOpen) {
          bottomSheetRef.current?.close();  // Close the Bottom Sheet
        } else {
          bottomSheetRef.current?.expand(); // Open the Bottom Sheet
        }
      };
    


     //render
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={toggleBottomSheet}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
            colors={['rgb(102, 20, 30)', 'rgb(255, 165, 0)']}
            style={styles.gradient}
          >
          <Text style={styles.buttonText}>Show Sheet</Text>
          </LinearGradient>
        </TouchableOpacity>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                
                enableContentPanningGesture={false}
                onChange={handleSheetChanges}
            >
                {renderContent()}
            </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#D3D3D3'
,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 50,  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50, 
    // Other styles as needed
  },
  wrapper: {
    // Swiper container styles
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // Define the common styles for each slide here
  },
  carouselText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
},
});

export default App;