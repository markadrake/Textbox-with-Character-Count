angular.module("umbraco").controller("Scylla.TextboxWithCharacterCount", function ($scope)
{

	// Loads Default Max Count
	$scope.model.maxCount = $scope.model.config.maxCount;

	// Attempts to re-define Max Count by description text
	if ($scope.model.description)
	{
		var maxSetInDescription = $scope.model.description.match(/\d+/);
		if (maxSetInDescription)
		{
			var newMax = parseInt(maxSetInDescription[0]);
			if (newMax > 0)
				$scope.model.maxCount = $scope.model.description.match(/\d+/)[0];
		}
	}

	// Calculate a low and medium range so we can set the CSS appropriately
	var low = Math.ceil($scope.model.maxCount * 0.25);
	var med = Math.ceil($scope.model.maxCount * 0.5);

	// Called when changes are detected within the textbox
	$scope.update = function()
	{
		// Calculate the remaining characters
		$scope.model.remainingCount = $scope.model.maxCount - $scope.model.value.length

		// Is our maximum limit reached?
		if ($scope.model.remainingCount <= 0)
		{
			$scope.model.remainingCount = 0;
			$scope.model.value = $scope.model.value.substr(0, $scope.model.maxCount)
			return;
		}

		// Set the correct CSS class
		if ($scope.model.remainingCount <= low)
			$scope.model.className = "red";
		else if ($scope.model.remainingCount <= med)
			$scope.model.className = "orange";
		else
			$scope.model.className = "green";

	}

	// Run the update method at start
	$scope.update();

});