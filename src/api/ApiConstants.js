export const DATASETS =  [
		{
			"mindate": "1763-01-01",
			"maxdate": "2017-08-23",
			"name": "Daily Summaries",
			"datacoverage": 1,
			"id": "GHCND"
		},
		{
			"mindate": "1763-01-01",
			"maxdate": "2017-07-01",
			"name": "Global Summary of the Month",
			"datacoverage": 1,
			"id": "GSOM"
		},
		{
			"mindate": "1763-01-01",
			"maxdate": "2017-01-01",
			"name": "Global Summary of the Year",
			"datacoverage": 1,
			"id": "GSOY"
		},
		{
			"mindate": "1991-06-05",
			"maxdate": "2017-08-28",
			"name": "Weather Radar (Level II)",
			"datacoverage": 0.95,
			"id": "NEXRAD2"
		},
		{
			"mindate": "1994-05-20",
			"maxdate": "2017-08-25",
			"name": "Weather Radar (Level III)",
			"datacoverage": 0.95,
			"id": "NEXRAD3"
		},
		// {
		// 	"mindate": "2010-01-01",
		// 	"maxdate": "2010-01-01",
		// 	"name": "Normals Annual/Seasonal",
		// 	"datacoverage": 1,
		// 	"id": "NORMAL_ANN"
		// },
		{
			"mindate": "2010-01-01",
			"maxdate": "2010-12-31",
			"name": "Normals Daily",
			"datacoverage": 1,
			"id": "NORMAL_DLY"
		},
		{
			"mindate": "2010-01-01",
			"maxdate": "2010-12-31",
			"name": "Normals Hourly",
			"datacoverage": 1,
			"id": "NORMAL_HLY"
		},
		{
			"mindate": "2010-01-01",
			"maxdate": "2010-12-01",
			"name": "Normals Monthly",
			"datacoverage": 1,
			"id": "NORMAL_MLY"
		},
		{
			"mindate": "1970-05-12",
			"maxdate": "2014-01-01",
			"name": "Precipitation 15 Minute",
			"datacoverage": 0.25,
			"id": "PRECIP_15"
		},
		{
			"mindate": "1900-01-01",
			"maxdate": "2014-01-01",
			"name": "Precipitation Hourly",
			"datacoverage": 1,
			"id": "PRECIP_HLY"
		}
	];

export const cachedStations = {"byId":{"GHCND:US1KSRS0025":{"datacoverage":1,"elevation":469.4,"elevationUnit":"METERS","id":"GHCND:US1KSRS0025","latitude":38.9988,"longitude":-98.5194,"maxdate":"2008-11-01","mindate":"2008-09-01","name":"LUCAS 4.2 SSE, KS US"},"GHCND:US1KSBU0024":{"datacoverage":1,"elevation":406.3,"elevationUnit":"METERS","id":"GHCND:US1KSBU0024","latitude":37.9856,"longitude":-97.0347,"maxdate":"2017-07-01","mindate":"2012-10-01","name":"WHITEWATER 6.3 ENE, KS US"},"GHCND:USC00346282":{"datacoverage":1,"elevation":365.8,"elevationUnit":"METERS","id":"GHCND:USC00346282","latitude":36.8981,"longitude":-96.9104,"maxdate":"2017-07-01","mindate":"2009-02-01","name":"NEWKIRK 8 E MESONET, OK US"},"GHCND:US1KSCM0006":{"datacoverage":1,"elevation":649.8,"elevationUnit":"METERS","id":"GHCND:US1KSCM0006","latitude":37.27,"longitude":-99.33,"maxdate":"2008-04-01","mindate":"2008-04-01","name":"COLDWATER 0.9 NNE, KS US"},"GHCND:USC00395641":{"datacoverage":1,"elevation":597.4,"elevationUnit":"METERS","id":"GHCND:USC00395641","latitude":44.7208,"longitude":-100.8797,"maxdate":"2008-05-01","mindate":"2000-11-01","name":"MISSION RIDGE 3 NW, SD US"},"GHCND:VQC00674600":{"datacoverage":1,"elevation":64,"elevationUnit":"METERS","id":"GHCND:VQC00674600","latitude":17.73333,"longitude":-64.78333,"maxdate":"1978-07-01","mindate":"1972-01-01","name":"KINGS HILL, US"}},"ids":["GHCND:US1KSRS0025","GHCND:US1KSBU0024","GHCND:USC00346282","GHCND:US1KSCM0006","GHCND:USC00395641","GHCND:VQC00674600"]};
export const cachedQueries = {"byId":{"GSOM.PRCP.PRCP":{"stationIds":["GHCND:US1KSRS0025","GHCND:US1KSBU0024","GHCND:USC00346282","GHCND:US1KSCM0006","GHCND:USC00395641","GHCND:VQC00674600"]}},"allIds":["GSOM.PRCP.PRCP"]};