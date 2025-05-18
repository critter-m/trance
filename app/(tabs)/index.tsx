import {Dimensions, FlatList, StyleSheet, Image, ScrollView, Switch, Text, View, TouchableOpacity} from "react-native";
import {Collapsible} from "@/app/components/Collapsible";
import React, {useState, useEffect} from "react";
// import Slider from '@react-native-community/slider';
import { useAudioPlayer } from 'expo-audio';
//test
const { width } = Dimensions.get('window');
const categories = ['Binaural Beat', 'Noise', 'Ambience', 'Drone', 'Ear Candy', 'Narration'];
const imageRows = [
    [
        {src: require('@/assets/images/waves/gamma.png'), label: 'Gamma'},
        {src: require('@/assets/images/waves/beta.png'), label: 'Beta'},
        {src: require('@/assets/images/waves/alpha.png'), label: 'Alpha'},
        {src: require('@/assets/images/waves/theta.png'), label: 'Theta'},
        {src: require('@/assets/images/waves/delta.png'), label: 'Delta'},
    ],
    [
        {src: require('@/assets/images/noise/white noise.jpg'), label: 'White'},
        {src: require('@/assets/images/noise/pink noise.jpg'), label: 'Pink'},
        {src: require('@/assets/images/noise/brown noise.jpg'), label: 'Brown'},
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
const audioFiles = [
    [
        {src: require('@/assets/audio/THETA-6Hz.wav'), label: 'Theta'},
        {src: require('@/assets/audio/DELTA-3Hz.wav'), label: 'Delta'},
    ],
    [
        {src: require('@/assets/audio/White Noise.wav'), label: 'White'},
        {src: require('@/assets/audio/Pink Noise.wav'), label: 'Pink'},
        {src: require('@/assets/audio/Brown Noise.wav'), label: 'Brown'}
    ],
    [
        {src: require('@/assets/audio/Suburban Tree Frogs.mp3'), label: 'Frogs'},
        {src: require('@/assets/audio/Summer Night (Crickets).mp3'), label: 'Crickets'}
    ],
];


export default function Index() {

    const [switchStates, setSwitchStates] = useState(
        Array(6).fill(false)
    );

    const toggleSwitch = (index: number) => {
        const newStates = [...switchStates];
        newStates[index] = !newStates[index];
        setSwitchStates(newStates);
        newStates[index] ? players[index].muted=false : players[index].muted=true;
    };

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
        if (isPlaying) {
            players.forEach(player => player.pause());
        }
        if (!isPlaying) {
            players.forEach(player => player.play());
        }
    };

    const players = [
        useAudioPlayer(audioFiles[0][0].src),
        useAudioPlayer(audioFiles[1][0].src),
        useAudioPlayer(audioFiles[2][0].src),
        useAudioPlayer(audioFiles[2][1].src),
    ];
    useEffect(() => {
        // Set all players to loop and pause them
        players.forEach((player) => {
            player.loop=true; // Set loop
            player.pause(); // Ensure players are paused initially
            player.muted=true;
        });
    }, []);

    const onScrollToIndex = (index: number, rowIndex: number) => {
        const currentPlayer = players[rowIndex]; // Load new audio
        currentPlayer.replace(audioFiles[rowIndex][index].src); // Play the new audio
        currentPlayer.play();
    };

  return (
      <View>
       <ScrollView
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.container}
       >
           {imageRows.map((images, rowIndex) => (
           <View style={styles.container} key={rowIndex}>
               <FlatList
                   data={images}
                   horizontal
                   pagingEnabled
                   showsHorizontalScrollIndicator={false}
                   keyExtractor={(_, i) => i.toString()}
                   renderItem={({ item, index }) => (
                       <View style={styles.imageWrapper}>
                           <Image
                                source={item.src}
                                style={styles.image}
                            />
                           <Text style={styles.overlayText}>{item.label}</Text>
                       </View>
                    )}
                   onMomentumScrollEnd={(e) => {
                       const contentOffsetX = e.nativeEvent.contentOffset.x;
                       const index = Math.floor(contentOffsetX / width);
                       onScrollToIndex(index, rowIndex);
                   }}
               />
               <Text style={styles.labelText}>{categories[rowIndex]}</Text>
               <Switch
                   style={styles.switch}
                   value={switchStates[rowIndex]}
                   onValueChange={() => toggleSwitch(rowIndex)}
               />
               <Collapsible title=''>
                   <Text style={styles.volumeLabel}>Volume</Text>
                   {/*<Slider*/}
                   {/*    style={styles.slider}*/}
                   {/*    minimumValue={0}*/}
                   {/*    maximumValue={1}*/}
                   {/*    // value={volume}*/}
                   {/*    // onValueChange={handleVolumeChange}*/}
                   {/*    thumbTintColor="#000"*/}
                   {/*    minimumTrackTintColor="#000"*/}
                   {/*    maximumTrackTintColor="#ddd"*/}
                   {/*/>*/}
               </Collapsible>
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

    volumeControl: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    volumeLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    slider: {
        width: '100%',
    },
});