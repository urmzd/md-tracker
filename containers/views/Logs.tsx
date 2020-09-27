import React, { useState } from 'react';
import {
	Avatar,
	Card,
	Searchbar,
	Title,
	Button,
	IconButton,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette } from '../../constants/Misc';
import { useSelector } from 'react-redux';
import { LogTemplate, RootState } from '../../types';
import moment from 'moment';

const Logs = ({ navigation }: any) => {
	const [query, setQuery] = useState<string>('');
	const logs = useSelector((state: RootState) => state.logs);
	const [data, setData] = useState<Array<LogTemplate>>([...logs.container]);

	const filterByQuery = (query: string) => {
		const filteredData = logs.container.filter((log: LogTemplate) => {
			let { startDateTime, endDateTime } = log;
			startDateTime = moment(startDateTime).format('MM-DD-YYYY HH:mm A');
			endDateTime = moment(endDateTime).format('MM-DD-YYYY HH:mm A');

			return (
				startDateTime.includes(query) || endDateTime?.includes(query)
			);
		});

		setQuery(query);
		setData(filteredData);
	};

	return (
		<SafeAreaView>
			<View style={{ flex: 1, padding: 12 }}>
				<View style={{ flex: 1 }}>
					<Searchbar
						placeholder='Search...'
						value={query}
						onChangeText={(query: string) => filterByQuery(query)}
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
					{data.map((log: LogTemplate, index: number) => {
						const { startDateTime, endDateTime } = log;
						return (
							<View
								key={index}
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
										right={(props: any) => (
											<IconButton
												icon='download'
												color={
													ColorPalette.PRIMARY_BLUE
												}
												{...props}
											/>
										)}
									></Card.Title>
								</Card>
							</View>
						);
					})}
				</ScrollView>
				<View style={{ flex: 1 }}>
					<Button
						mode='contained'
						accessibilityValue={{ text: 'Download All Button' }}
						focusable={true}
						color={ColorPalette.PRIMARY_BLUE}
						style={{ borderRadius: 100 }}
					>
						<Title style={{ color: ColorPalette.WHITE }}>
							DOWNLOAD ALL
						</Title>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Logs;
