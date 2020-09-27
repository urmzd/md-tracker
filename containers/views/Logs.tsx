import React, { useState } from 'react';
import { Avatar, Card, Searchbar } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette } from '../../constants/Misc';
import { useSelector } from 'react-redux';
import { LogTemplate, RootState } from '../../types';
import moment from 'moment';

const Logs = ({ navigation }: any) => {
	const [query, setQuery] = useState<string>('');
	const logs = useSelector((state: RootState) => state.logs);
	const container = [...logs.container];

	return (
		<SafeAreaView>
			<View style={{ flex: 1, padding: 12 }}>
				<View style={{ flex: 1 }}>
					<Searchbar
						placeholder='Search...'
						value={query}
						onChangeText={(query: string) => setQuery(query)}
						style={{ backgroundColor: ColorPalette.WHITE }}
						accessibilityValue={{ text: 'search bar' }}
						focusable={true}
						showSoftInputOnFocus={true}
					/>
				</View>

				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						paddingTop: 8,
						paddingBottom: 8,
					}}
				>
					{container.map((log: LogTemplate, index: number) => {
						const { startDateTime, endDateTime } = log;
						return (
							<View
								style={{
									flex: 1,
									paddingTop: 8,
									paddingBottom: 8,
								}}
							>
								<Card
									accessibilityValue={{
										text: 'Symptom Record',
									}}
									key={index}
									focusable={true}
								>
									<Card.Title
										title={moment(startDateTime).format(
											'MM-DD-YYYY HH:mm A'
										)}
										subtitle={moment(endDateTime).format(
											'MM-DD-YYYY HH:mm A'
										)}
										accessibilityValue={{
											text: `${startDateTime} Symptom Record`,
										}}
										focusable={true}
										left={(props: any) => (
											<Avatar.Icon
												{...props}
												icon='file-delimited'
												color={ColorPalette.WHITE}
												style={{
													backgroundColor:
														ColorPalette.PRIMARY_BLUE,
												}}
											/>
										)}
									></Card.Title>
								</Card>
							</View>
						);
					})}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default Logs;
