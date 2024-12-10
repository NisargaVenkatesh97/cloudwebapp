## [1.0.6](https://github.com/csye7125-fall2023-group05/producer/compare/v1.0.5...v1.0.6) (2023-12-08)


### Bug Fixes

* istio-connection ([80ad843](https://github.com/csye7125-fall2023-group05/producer/commit/80ad8433ce8f96c36fc88674e15b8fdc23629935))

## [1.0.5](https://github.com/csye7125-fall2023-group05/producer/compare/v1.0.4...v1.0.5) (2023-11-27)


### Bug Fixes

* code cleanup to remove Kafka broker warnings ([28c6220](https://github.com/csye7125-fall2023-group05/producer/commit/28c6220ecace4351939a2bea6291fe705d031e69))

## [1.0.4](https://github.com/csye7125-fall2023-group05/producer/compare/v1.0.3...v1.0.4) (2023-11-27)


### Bug Fixes

* producer message send debug fix ([48d768b](https://github.com/csye7125-fall2023-group05/producer/commit/48d768b887d559f28d7322e64a96c9561ddf41bc))

## [1.0.3](https://github.com/csye7125-fall2023-group05/producer/compare/v1.0.2...v1.0.3) (2023-11-23)


### Bug Fixes

* change env vars ([4ac5ca1](https://github.com/csye7125-fall2023-group05/producer/commit/4ac5ca151d0327689285df4da5fb055217ca73db))

## [1.0.2](https://github.com/csye7125-fall2023-group05/producer/compare/v1.0.1...v1.0.2) (2023-11-22)


### Bug Fixes

* include http_check_id in msg ([88c9b17](https://github.com/csye7125-fall2023-group05/producer/commit/88c9b17b1f38630ac06ad11dffb29f5b785124c1))
* udpate env vars from CM to include name, retries ([5536c64](https://github.com/csye7125-fall2023-group05/producer/commit/5536c64f397e9077a8eda057b3d80080c173d658))

## [1.0.1](https://github.com/csye7125-fall2023-group05/producer/compare/v1.0.0...v1.0.1) (2023-11-20)


### Bug Fixes

* add clean exit with code 1 for Kafka producer error ([25b4cbf](https://github.com/csye7125-fall2023-group05/producer/commit/25b4cbf45f5f2f96a3aa825a48602472b61667e6)), closes [#9](https://github.com/csye7125-fall2023-group05/producer/issues/9)

# 1.0.0 (2023-11-16)


### Bug Fixes

* update releaserc remote repository URL ([0d3f15c](https://github.com/csye7125-fall2023-group05/producer/commit/0d3f15c5998b3651ac45c7dac90db0f35af8a35a))


### Features

* add CI/CD Jenkins Groovy pipeline and semver releaserc ([781475e](https://github.com/csye7125-fall2023-group05/producer/commit/781475e5205f88439aa9bd8e09bd55db227d03c7)), closes [#4](https://github.com/csye7125-fall2023-group05/producer/issues/4)
* add fetch function to get the health status check ([0480210](https://github.com/csye7125-fall2023-group05/producer/commit/04802109ce6d1d007f8e85266faccedb842ca48a))
* basic Kafka producer app ([1b3145a](https://github.com/csye7125-fall2023-group05/producer/commit/1b3145a209803560a55c26996a8794d61f5f3ff4))
* publish dummy `healthcheck` data to Kafka brokers ([6cd6fc2](https://github.com/csye7125-fall2023-group05/producer/commit/6cd6fc2a1fc8c46c3e0ed437fd65e27095f7fb20)), closes [#1](https://github.com/csye7125-fall2023-group05/producer/issues/1)
