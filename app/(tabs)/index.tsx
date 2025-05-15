import {Dimensions, FlatList, StyleSheet, Image, ScrollView, Switch, Text, View, TouchableOpacity} from "react-native";
import {Collapsible} from "@/app-example/components/Collapsible";
import {useState} from "react";


const categories = ['Binaural Beat', 'Noise', 'Drone', 'Ambience', 'Ear Candy', 'Narration'];
const imageRows = [
    [
        {src: require('@/assets/images/waves/gamma.png'), label: 'Gamma'},
        {src: require('@/assets/images/waves/beta.png'), label: 'Beta'},
        {src: require('@/assets/images/waves/alpha.png'), label: 'Alpha'},
        {src: require('@/assets/images/waves/theta.png'), label: 'Theta'},
        {src: require('@/assets/images/waves/delta.png'), label: 'Delta'},
    ],
    [
        {src: require('@/assets/images/waves/gamma.png'), label: 'White'},
        {src: require('@/assets/images/waves/beta.png'), label: 'Pink'},
        {src: require('@/assets/images/waves/alpha.png'), label: 'Brown'},
    ],[
        {src: require('@/assets/images/waves/gamma.png'), label: 'Gamma'},
        {src: require('@/assets/images/waves/beta.png'), label: 'Beta'},
        {src: require('@/assets/images/waves/alpha.png'), label: 'Alpha'},
        {src: require('@/assets/images/waves/theta.png'), label: 'Theta'},
        {src: require('@/assets/images/waves/delta.png'), label: 'Delta'},
    ],[
        {src: require('@/assets/images/waves/gamma.png'), label: 'Gamma'},
        {src: require('@/assets/images/waves/beta.png'), label: 'Beta'},
        {src: require('@/assets/images/waves/alpha.png'), label: 'Alpha'},
        {src: require('@/assets/images/waves/theta.png'), label: 'Theta'},
        {src: require('@/assets/images/waves/delta.png'), label: 'Delta'},
    ],[
        {src: require('@/assets/images/waves/gamma.png'), label: 'Gamma'},
        {src: require('@/assets/images/waves/beta.png'), label: 'Beta'},
        {src: require('@/assets/images/waves/alpha.png'), label: 'Alpha'},
        {src: require('@/assets/images/waves/theta.png'), label: 'Theta'},
        {src: require('@/assets/images/waves/delta.png'), label: 'Delta'},
    ],[
        {src: require('@/assets/images/waves/gamma.png'), label: 'Gamma'},
        {src: require('@/assets/images/waves/beta.png'), label: 'Beta'},
        {src: require('@/assets/images/waves/alpha.png'), label: 'Alpha'},
        {src: require('@/assets/images/waves/theta.png'), label: 'Theta'},
        {src: require('@/assets/images/waves/delta.png'), label: 'Delta'},
    ],
];

const { width } = Dimensions.get('window');


export default function Index() {
    const [switchStates, setSwitchStates] = useState(
        Array(6).fill(false)
    );

    const toggleSwitch = (index: number) => {
        const newStates = [...switchStates];
        newStates[index] = !newStates[index];
        setSwitchStates(newStates);
    };

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };


  return (
      <View>

       <ScrollView
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.container}
       >
           {imageRows.map((images, rowIndex) => (
           <View style={styles.row} key={rowIndex}>
               <FlatList
                   data={images}
                   horizontal
                   pagingEnabled
                   showsHorizontalScrollIndicator={false}
                   keyExtractor={(_, i) => i.toString()}
                   renderItem={({ item }) => (
                       <View style={styles.imageWrapper}>
                           <Image
                                source={item.src}
                                style={styles.image}
                            />

                           <Text style={styles.overlayText}>{item.label}</Text>
                       </View>
                    )}
               />
               <Text style={styles.labelText}>{categories[rowIndex]}</Text>
               <Switch
                   style={styles.switch}
                   value={switchStates[rowIndex]}
                   onValueChange={() => toggleSwitch(rowIndex)}
               />
           </View>
           ))}
       </ScrollView>
       <View style={styles.player}>
           <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
               <Text style={styles.buttonText}>
                   {isPlaying ? '||' : '>'}
               </Text>
           </TouchableOpacity>
       </View>

      </View>
  );
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 70,
    },
    row: {
        position: 'relative',
    },
    image: {
        width: width,
        height: 150,
        resizeMode: 'cover',
    },
    switch: {
        position: 'absolute',
        top: '50%',
        left: 10,
        transform: [{ translateY: -20 }],
        zIndex: 1,
    },
    overlayText: {
        position: 'absolute',
        color: 'white',
        outline: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        bottom: 8,
        left: 10,
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    labelText: {
        position: 'absolute',
        color: 'black',
        outline: 'white',
        left: 0,
        right: 0,
        top: '36%',
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        // top: '50%',
        // left: '50%',
        // transform: [{ translateY: -20 }, {translateX: -20}],
        zIndex: 1,
        textAlign: 'center',
        pointerEvents: 'none',

    },

    imageWrapper: {
        width: width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },


    player: {
        width: width,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
    },

    playPauseButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
    },

    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },


});