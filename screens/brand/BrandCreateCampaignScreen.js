import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  TouchableOpacity 
} from 'react-native';
import { Button, InputField, Card } from '../../components';
import { useAuthStore } from '../../state';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

export default function BrandCreateCampaignScreen({ navigation }) {
  const { user } = useAuthStore();
  
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1: Campaign Details - Name, followers, formats, categories
  const [campaignName, setCampaignName] = useState('');
  const [minFollowers, setMinFollowers] = useState('');
  const [maxFollowers, setMaxFollowers] = useState('');
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Step 2: Compensation Details - Barter value, discounts, affiliate %
  const [barterValue, setBarterValue] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [affiliatePercentage, setAffiliatePercentage] = useState('');
  const [compensationType, setCompensationType] = useState('');
  
  // Step 3: Timeline & Requirements - Visibility date, delivery time, revision count
  const [visibilityDate, setVisibilityDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [revisionCount, setRevisionCount] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  // UI state
  const [errors, setErrors] = useState({});

  // Content format options
  const formatOptions = [
    { id: 'posts', name: 'Instagram Posts', icon: 'images-outline' },
    { id: 'stories', name: 'Instagram Stories', icon: 'camera-outline' },
    { id: 'reels', name: 'Reels', icon: 'videocam-outline' },
    { id: 'tiktok', name: 'TikTok', icon: 'musical-notes-outline' },
    { id: 'youtube', name: 'YouTube', icon: 'logo-youtube' },
    { id: 'blog', name: 'Blog Posts', icon: 'document-text-outline' },
  ];

  // Category options
  const categoryOptions = [
    { id: 'fashion', name: 'Fashion', icon: 'shirt-outline' },
    { id: 'beauty', name: 'Beauty', icon: 'rose-outline' },
    { id: 'lifestyle', name: 'Lifestyle', icon: 'cafe-outline' },
    { id: 'fitness', name: 'Fitness', icon: 'fitness-outline' },
    { id: 'tech', name: 'Technology', icon: 'phone-portrait-outline' },
    { id: 'food', name: 'Food & Drink', icon: 'restaurant-outline' },
    { id: 'travel', name: 'Travel', icon: 'airplane-outline' },
    { id: 'entertainment', name: 'Entertainment', icon: 'game-controller-outline' },
  ];

  // Compensation types
  const compensationTypes = [
    { id: 'paid', name: 'Paid Campaign', icon: 'card-outline' },
    { id: 'barter', name: 'Barter Only', icon: 'swap-horizontal-outline' },
    { id: 'affiliate', name: 'Affiliate Only', icon: 'link-outline' },
    { id: 'hybrid', name: 'Hybrid (Paid + Barter)', icon: 'duplicate-outline' },
  ];

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!campaignName.trim() || !minFollowers.trim() || selectedFormats.length === 0 || selectedCategories.length === 0) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
    } else if (currentStep === 2) {
      if (!compensationType || (!barterValue.trim() && !discountPercentage.trim() && !affiliatePercentage.trim())) {
        Alert.alert('Error', 'Please select compensation type and fill in compensation details');
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const toggleFormat = (formatId) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (!visibilityDate.trim() || !deliveryTime.trim() || !revisionCount.trim()) {
      Alert.alert('Error', 'Please fill in all timeline and requirements fields');
      return;
    }

    setIsLoading(true);

    // Prepare campaign data
    const campaignData = {
      // Step 1: Campaign Details
      campaignName,
      followerRange: { min: parseInt(minFollowers), max: parseInt(maxFollowers) },
      formats: selectedFormats.map(id => 
        formatOptions.find(opt => opt.id === id)?.name
      ),
      categories: selectedCategories.map(id => 
        categoryOptions.find(opt => opt.id === id)?.name
      ),
      
      // Step 2: Compensation Details
      compensationType,
      barterValue: parseFloat(barterValue) || 0,
      discountPercentage: parseFloat(discountPercentage) || 0,
      affiliatePercentage: parseFloat(affiliatePercentage) || 0,
      
      // Step 3: Timeline & Requirements
      visibilityDate,
      deliveryTime,
      revisionCount: parseInt(revisionCount),
      additionalRequirements,
      
      // Meta data
      brandId: user?.userId,
      status: 'draft',
      createdAt: new Date().toISOString(),
      id: `cmp_${Date.now()}`,
    };

    console.log('🚀 Creating Campaign:');
    console.log('==================');
    console.log('Campaign Name:', campaignData.campaignName);
    console.log('Follower Range:', `${campaignData.followerRange.min}K - ${campaignData.followerRange.max}K`);
    console.log('Formats:', campaignData.formats.join(', '));
    console.log('Categories:', campaignData.categories.join(', '));
    console.log('Compensation Type:', campaignData.compensationType);
    console.log('Barter Value: $', campaignData.barterValue);
    console.log('Discount %:', campaignData.discountPercentage);
    console.log('Affiliate %:', campaignData.affiliatePercentage);
    console.log('Visibility Date:', campaignData.visibilityDate);
    console.log('Delivery Time:', campaignData.deliveryTime);
    console.log('Revision Count:', campaignData.revisionCount);
    console.log('==================');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Campaign Created Successfully!',
        `"${campaignData.campaignName}" campaign has been created and is ready for creator applications.`,
        [
          {
            text: 'View Campaigns',
            onPress: () => navigation.navigate('Campaigns')
          },
          {
            text: 'Create Another',
            onPress: () => {
              // Reset all form data
              setCurrentStep(1);
              setCampaignName('');
              setMinFollowers('');
              setMaxFollowers('');
              setSelectedFormats([]);
              setSelectedCategories([]);
              setBarterValue('');
              setDiscountPercentage('');
              setAffiliatePercentage('');
              setCompensationType('');
              setVisibilityDate('');
              setDeliveryTime('');
              setRevisionCount('');
              setAdditionalRequirements('');
              setErrors({});
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error creating campaign:', error);
      Alert.alert('Error', 'Failed to create campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <View className="flex-row justify-center items-center mb-8">
      {[1, 2, 3].map((step) => (
        <View key={step} className="flex-row items-center">
          <View className={`w-8 h-8 rounded-full justify-center items-center ${
            step <= currentStep ? 'bg-primary' : 'bg-gray-200'
          }`}>
            <Text className={`text-sm font-bold ${
              step <= currentStep ? 'text-white' : 'text-gray-400'
            }`}>
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View className={`w-8 h-0.5 mx-2 ${
              step < currentStep ? 'bg-primary' : 'bg-gray-200'
            }`} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">Campaign Details</Text>
      <Text className="text-gray-600 text-center mb-8">
        Name, followers, formats, and categories
      </Text>
      
      <InputField
        label="Campaign Name *"
        placeholder="e.g., Summer Collection Launch"
        value={campaignName}
        onChangeText={setCampaignName}
      />
      
      <View className="flex-row space-x-3 mb-4">
        <InputField
          label="Min Followers (K) *"
          placeholder="10"
          value={minFollowers}
          onChangeText={setMinFollowers}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <InputField
          label="Max Followers (K)"
          placeholder="100"
          value={maxFollowers}
          onChangeText={setMaxFollowers}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
      </View>
      
      {/* Content Formats */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">Content Formats *</Text>
        <View className="flex-row flex-wrap gap-3">
          {formatOptions.map((format) => (
            <TouchableOpacity
              key={format.id}
              onPress={() => toggleFormat(format.id)}
              className={`flex-1 min-w-[45%] p-4 rounded-lg border-2 ${
                selectedFormats.includes(format.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name={format.icon} 
                  size={24} 
                  color={selectedFormats.includes(format.id) ? Colors.primary : Colors.gray500} 
                />
                <Text className={`text-sm font-medium mt-2 text-center ${
                  selectedFormats.includes(format.id) ? 'text-primary' : 'text-gray-700'
                }`}>
                  {format.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Categories */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">Categories *</Text>
        <View className="flex-row flex-wrap gap-3">
          {categoryOptions.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              className={`flex-1 min-w-[45%] p-4 rounded-lg border-2 ${
                selectedCategories.includes(category.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name={category.icon} 
                  size={24} 
                  color={selectedCategories.includes(category.id) ? Colors.primary : Colors.gray500} 
                />
                <Text className={`text-sm font-medium mt-2 text-center ${
                  selectedCategories.includes(category.id) ? 'text-primary' : 'text-gray-700'
                }`}>
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <Button
        title="Next"
        onPress={handleNextStep}
        disabled={!campaignName.trim() || !minFollowers.trim() || selectedFormats.length === 0 || selectedCategories.length === 0}
        size="large"
        style={{ marginTop: 20 }}
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">Compensation Details</Text>
      <Text className="text-gray-600 text-center mb-8">
        Barter value, discounts, and affiliate percentage
      </Text>
      
      {/* Compensation Type */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">Compensation Type *</Text>
        <View className="flex-row flex-wrap gap-3">
          {compensationTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setCompensationType(type.id)}
              className={`flex-1 min-w-[45%] p-4 rounded-lg border-2 ${
                compensationType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name={type.icon} 
                  size={24} 
                  color={compensationType === type.id ? Colors.primary : Colors.gray500} 
                />
                <Text className={`text-sm font-medium mt-2 text-center ${
                  compensationType === type.id ? 'text-primary' : 'text-gray-700'
                }`}>
                  {type.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <InputField
        label="Barter Value (USD)"
        placeholder="500"
        value={barterValue}
        onChangeText={setBarterValue}
        keyboardType="numeric"
        leftIcon="card"
      />
      
      <InputField
        label="Discount Percentage (%)"
        placeholder="20"
        value={discountPercentage}
        onChangeText={setDiscountPercentage}
        keyboardType="numeric"
        leftIcon="percent"
      />
      
      <InputField
        label="Affiliate Percentage (%)"
        placeholder="10"
        value={affiliatePercentage}
        onChangeText={setAffiliatePercentage}
        keyboardType="numeric"
        leftIcon="trending-up"
      />
      
      <View className="flex-row space-x-3 mt-6">
        <Button
          title="Back"
          onPress={handlePrevStep}
          variant="outline"
          size="large"
          style={{ flex: 1 }}
        />
        <Button
          title="Next"
          onPress={handleNextStep}
          disabled={!compensationType}
          size="large"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">Timeline & Requirements</Text>
      <Text className="text-gray-600 text-center mb-8">
        Visibility date, delivery time, and revision count
      </Text>
      
      <InputField
        label="Visibility Date *"
        placeholder="e.g., March 15, 2024"
        value={visibilityDate}
        onChangeText={setVisibilityDate}
        leftIcon="calendar"
      />
      
      <InputField
        label="Delivery Time *"
        placeholder="e.g., 7 days, 2 weeks"
        value={deliveryTime}
        onChangeText={setDeliveryTime}
        leftIcon="time"
      />
      
      <InputField
        label="Revision Count *"
        placeholder="3"
        value={revisionCount}
        onChangeText={setRevisionCount}
        keyboardType="numeric"
        leftIcon="refresh"
      />
      
      <InputField
        label="Additional Requirements"
        placeholder="Any specific requirements, brand guidelines, or special instructions..."
        value={additionalRequirements}
        onChangeText={setAdditionalRequirements}
        multiline
        numberOfLines={4}
      />
      
      <View className="flex-row space-x-3 mt-6">
        <Button
          title="Back"
          onPress={handlePrevStep}
          variant="outline"
          size="large"
          style={{ flex: 1 }}
        />
        <Button
          title="Create Campaign"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={!visibilityDate.trim() || !deliveryTime.trim() || !revisionCount.trim()}
          size="large"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView className="flex-1 px-6 py-4">
          {renderStepIndicator()}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 