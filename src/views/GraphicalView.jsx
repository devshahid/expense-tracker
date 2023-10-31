import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colours } from '../constants/constant';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Tabs from '../components/Home/Tabs';

const GraphicalView = ({ graphLabels, graphData, selectedTab, setSelectedTab }) => {
  return (
    <>
      <View style={styles.graphViewContainer}>
        <Text style={styles.graphViewLabel}>Spend Frequency</Text>
      </View>
      <View style={styles.graphContainer}>
        <LineChart
          data={{
            labels: graphLabels,
            datasets: [
              {
                data: graphData,
                color: (opacity = 1) => `rgba(78, 38, 102, ${opacity})`,
              },
            ],
          }}
          width={Dimensions.get('window').width - 10} // from react-native
          height={220}
          yAxisLabel="₹ "
          chartConfig={{
            propsForVerticalLabels: {
              fontSize: 10,
              fontWeight: 'bold',
              opacity: 1,
            },
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#a8c0ff',
            backgroundGradientTo: '#3f2b96',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(39, 17, 79, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            fillShadowGradientOpacity: 0.5,
            fillShadowGradient: Colours.WHITE_PURE,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '1',
              stroke: Colours.WHITE_PURE,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={styles.tabMainContainer}>
        {['Today', 'Week', 'Month'].map((element, i) => (
          <Tabs
            key={i}
            focused={element}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </View>
    </>
  );
};

export default GraphicalView;

const styles = StyleSheet.create({
  graphViewContainer: {
    marginTop: 20,
    padding: 8,
  },
  graphViewLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colours.BLACK,
  },
  graphContainer: {
    minheight: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphImage: {
    width: '100%',
    height: '100%',
  },
  tabMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginVertical: 5,
    marginTop: 20,
  },
});
