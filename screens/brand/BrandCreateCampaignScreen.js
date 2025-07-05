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
import { validateRequired, validateNumber, validateMinLength } from '../../utils/validators';

export default function BrandCreateCampaignScreen({ navigation }) {
  const { user } = useAuthStore();
  
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1: Product Details
  const [productTitle, setProductTitle] = useState('');
  const [brandName, setBrandName] = useState(user?.name || '');
  const [niche, setNiche] = useState('');
  const [productDescription, setProductDescription] = useState('');
  
  // Step 2: Campaign Brief, Deliverables, Budget
  const [campaignBrief, setCampaignBrief] = useState('');
  const [deliverables, setDeliverables] = useState([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  
  // Step 3: Additional Requirements
  const [targetAudience, setTargetAudience] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [campaignType, setCampaignType] = useState('');
  
  // UI state
  const [errors, setErrors] = useState({});

  // Deliverable options
  const deliverableOptions = [
    { id: 'posts', name: 'Social Media Posts', icon: 'images-outline' },
    { id: 'stories', name: 'Instagram Stories', icon: 'camera-outline' },
    { id: 'reels', name: 'Reels/TikToks', icon: 'videocam-outline' },
    { id: 'blog', name: 'Blog Posts', icon: 'document-text-outline' },
    { id: 'reviews', name: 'Product Reviews', icon: 'star-outline' },
    { id: 'unboxing', name: 'Unboxing Videos', icon: 'cube-outline' },
  ];

  // Campaign type options
  const campaignTypes = [
    { id: 'product_launch', name: 'Product Launch', icon: 'rocket-outline' },
    { id: 'brand_awareness', name: 'Brand Awareness', icon: 'megaphone-outline' },
    { id: 'content_creation', name: 'Content Creation', icon: 'camera-outline' },
    { id: 'event_promotion', name: 'Event Promotion', icon: 'calendar-outline' },
  ];

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!productTitle.trim() || !brandName.trim() || !niche.trim() || !productDescription.trim()) {
        Alert.alert('Error', 'Please fill in all product details');
        return;
      }
    } else if (currentStep === 2) {
      if (!campaignBrief.trim() || deliverables.length === 0 || !budget.trim() || !timeline.trim()) {
        Alert.alert('Error', 'Please fill in campaign brief, select deliverables, and set budget & timeline');
        return;
      }
      if (parseFloat(budget) < 100) {
        Alert.alert('Error', 'Budget must be at least $100');
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const toggleDeliverable = (deliverableId) => {
    setDeliverables(prev => 
      prev.includes(deliverableId) 
        ? prev.filter(id => id !== deliverableId)
        : [...prev, deliverableId]
    );
  };

  const handleSubmit = async () => {
    if (!targetAudience.trim() || !campaignType) {
      Alert.alert('Error', 'Please fill in target audience and select campaign type');
      return;
    }

    setIsLoading(true);

    // Prepare comprehensive campaign data
    const campaignData = {
      // Step 1: Product Details
      productTitle,
      brandName,
      niche,
      productDescription,
      
      // Step 2: Campaign Brief & Deliverables
      campaignBrief,
      deliverables: deliverables.map(id => 
        deliverableOptions.find(opt => opt.id === id)?.name
      ),
      budget: parseFloat(budget),
      timeline,
      
      // Step 3: Additional Requirements
      targetAudience,
      additionalRequirements,
      campaignType,
      
      // Meta data
      brandId: user?.userId,
      status: 'draft',
      createdAt: new Date().toISOString(),
      id: `cmp_${Date.now()}`,
    };

    console.log('🚀 Creating Comprehensive Campaign:');
    console.log('====================================');
    console.log('Campaign ID:', campaignData.id);
    console.log('');
    console.log('📦 PRODUCT DETAILS:');
    console.log('Product Title:', campaignData.productTitle);
    console.log('Brand Name:', campaignData.brandName);
    console.log('Niche:', campaignData.niche);
    console.log('Product Description:', campaignData.productDescription);
    console.log('');
    console.log('📋 CAMPAIGN BRIEF:');
    console.log('Campaign Brief:', campaignData.campaignBrief);
    console.log('Deliverables:', campaignData.deliverables.join(', '));
    console.log('Budget: $', campaignData.budget.toLocaleString());
    console.log('Timeline:', campaignData.timeline);
    console.log('');
    console.log('🎯 ADDITIONAL REQUIREMENTS:');
    console.log('Campaign Type:', campaignData.campaignType);
    console.log('Target Audience:', campaignData.targetAudience);
    console.log('Additional Requirements:', campaignData.additionalRequirements || 'None specified');
    console.log('');
    console.log('Created At:', campaignData.createdAt);
    console.log('====================================');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Campaign Created Successfully!',
        `"${campaignData.productTitle}" campaign has been created. Check the console for full details.`,
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
              setProductTitle('');
              setBrandName(user?.name || '');
              setNiche('');
              setProductDescription('');
              setCampaignBrief('');
              setDeliverables([]);
              setBudget('');
              setTimeline('');
              setTargetAudience('');
              setAdditionalRequirements('');
              setCampaignType('');
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
      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">Product Details</Text>
      <Text className="text-gray-600 text-center mb-8">
        Tell us about your product or service
      </Text>
      
      <InputField
        label="Product/Service Title *"
        placeholder="e.g., Eco-Friendly Water Bottle"
        value={productTitle}
        onChangeText={setProductTitle}
      />
      
      <InputField
        label="Brand Name *"
        placeholder="Your brand name"
        value={brandName}
        onChangeText={setBrandName}
      />
      
      <InputField
        label="Niche *"
        placeholder="e.g., Health & Wellness, Tech, Fashion"
        value={niche}
        onChangeText={setNiche}
      />
      
      <InputField
        label="Product Description *"
        placeholder="Describe your product, its key features, and benefits..."
        value={productDescription}
        onChangeText={setProductDescription}
        multiline
        numberOfLines={4}
      />
      
      <Button
        title="Next"
        onPress={handleNextStep}
        disabled={!productTitle.trim() || !brandName.trim() || !niche.trim() || !productDescription.trim()}
        size="large"
        style={{ marginTop: 20 }}
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">Campaign Brief</Text>
      <Text className="text-gray-600 text-center mb-8">
        Define your campaign objectives and deliverables
      </Text>
      
      <InputField
        label="Campaign Brief *"
        placeholder="Describe your campaign goals, key messages, and what you want to achieve..."
        value={campaignBrief}
        onChangeText={setCampaignBrief}
        multiline
        numberOfLines={4}
      />
      
      {/* Deliverables Selection */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">Select Deliverables *</Text>
        <View className="flex-row flex-wrap gap-3">
          {deliverableOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => toggleDeliverable(option.id)}
              className={`flex-1 min-w-[45%] p-4 rounded-lg border-2 ${
                deliverables.includes(option.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name={option.icon} 
                  size={24} 
                  color={deliverables.includes(option.id) ? Colors.primary : Colors.gray500} 
                />
                <Text className={`text-sm font-medium mt-2 text-center ${
                  deliverables.includes(option.id) ? 'text-primary' : 'text-gray-700'
                }`}>
                  {option.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <InputField
        label="Budget (USD) *"
        placeholder="1000"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
        leftIcon="card"
      />
      
      <InputField
        label="Timeline *"
        placeholder="e.g., 2 weeks, 1 month"
        value={timeline}
        onChangeText={setTimeline}
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
          disabled={!campaignBrief.trim() || deliverables.length === 0 || !budget.trim() || !timeline.trim()}
          size="large"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">Additional Requirements</Text>
      <Text className="text-gray-600 text-center mb-8">
        Specify your target audience and any additional requirements
      </Text>
      
      <InputField
        label="Target Audience *"
        placeholder="e.g., Women aged 25-35, interested in fitness and wellness"
        value={targetAudience}
        onChangeText={setTargetAudience}
        multiline
        numberOfLines={3}
      />
      
      {/* Campaign Type Selection */}
      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-3">Campaign Type *</Text>
        <View className="flex-row flex-wrap gap-3">
          {campaignTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setCampaignType(type.id)}
              className={`flex-1 min-w-[45%] p-4 rounded-lg border-2 ${
                campaignType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <View className="items-center">
                <Ionicons 
                  name={type.icon} 
                  size={24} 
                  color={campaignType === type.id ? Colors.primary : Colors.gray500} 
                />
                <Text className={`text-sm font-medium mt-2 text-center ${
                  campaignType === type.id ? 'text-primary' : 'text-gray-700'
                }`}>
                  {type.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
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
          disabled={!targetAudience.trim() || !campaignType}
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